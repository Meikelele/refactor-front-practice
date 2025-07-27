package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/stianeikeland/go-rpio/v4"
)

var (
	daysWeekday     []time.Weekday = []time.Weekday{}
	days            []string       = []string{}
	soilMoisture                   = "needed"
	soilMoisturePin                = rpio.Pin(6)
	waterLevel1                    = false
	pinLevel1                      = rpio.Pin(4)
	waterLevel2                    = false
	pinLevel2                      = rpio.Pin(17)
	waterLevel3                    = false
	pinLevel3                      = rpio.Pin(27)
	valveSwitch                    = false
	valvePin                       = rpio.Pin(22)
	pumpSwitch                     = false
	pumpPin                        = rpio.Pin(10)
	pouring                        = false
	// pouringSensorPin                = rpio.Pin(9)
	pouringStatus    = false
	pouringStatusPin = rpio.Pin(26)
	// initialTime      string
	initialTime string = "00:00"

	// endTime string
	endTime          string = "23:59"
	firstRunSchedule        = false
)

func main() {

	err := rpio.Open()
	if err != nil {
		log.Fatal(err)
	}

	soilMoisturePin.Input()

	pumpPin.Output()
	valvePin.Output()
	// pouringSensorPin.Output()

	pinLevel1.Input()
	pinLevel2.Input()
	pinLevel3.Input()
	pouringStatusPin.Input()

	pinLevel1.PullUp()
	pinLevel2.PullUp()
	pinLevel3.PullUp()
	pouringStatusPin.PullUp()

	finish := make(chan struct{})

	mux := http.NewServeMux()

	mux.HandleFunc("/pumpOn", func(w http.ResponseWriter, r *http.Request) {
		pumpSwitch = true
		pumpPin.High()
	})
	mux.HandleFunc("/pumpOff", func(w http.ResponseWriter, r *http.Request) {
		pumpSwitch = false
		pumpPin.Low()
	})

	mux.HandleFunc("/valveOn", func(w http.ResponseWriter, r *http.Request) {
		valveSwitch = true
		valvePin.High()
	})
	mux.HandleFunc("/valveOff", func(w http.ResponseWriter, r *http.Request) {
		valveSwitch = false
		valvePin.Low()
	})

	mux.HandleFunc("/manualMode", func(w http.ResponseWriter, r *http.Request) {
		// defer func() {
		// 	valvePin.Low()
		// 	pumpPin.Low()

		// }()
		// for {
		// 	select {
		// 	case <-finish:
		// 	default:
		// 		finish <- struct{}{}
		// 		return
		// 	}
		// }

	})

	_ = valveSwitch
	_ = pumpSwitch

	// Serwowanie pliku HTML na stronie głównej
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "gardON.html")
	})

	// mux.HandleFunc("/submit", func(w http.ResponseWriter, r *http.Request) {
	// 	if err := r.ParseForm(); err != nil {
	// 		http.Error(w, "Form error", http.StatusBadRequest)
	// 		return
	// 	}

	// 	// Pobieranie wartości z formularza
	// 	days := r.Form["days"]
	// 	initialTime := r.FormValue("initialTime")
	// 	endTime := r.FormValue("endTime")

	// 	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	// 	fmt.Fprintf(w, "Selected days: %s<br>Since: %s<br>Until: %s",
	// 		strings.Join(days, ", "),
	// 		initialTime,
	// 		endTime,
	// 	)

	// })

	mux.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		if soilMoisturePin.Read() == rpio.Low {
			soilMoisture = "not needed"
		} else {
			soilMoisture = "needed"
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(soilMoisture)
	})

	mux.HandleFunc("/status", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		if pinLevel1.Read() == rpio.Low {
			waterLevel1 = true
		} else {
			waterLevel1 = false
		}
		if pinLevel2.Read() == rpio.Low {
			waterLevel2 = true
		} else {
			waterLevel2 = false
		}
		if pinLevel3.Read() == rpio.Low {
			waterLevel3 = true
		} else {
			waterLevel3 = false
		}
		if pouringStatusPin.Read() == rpio.Low {
			pouring = true
			// pouringSensorPin.High()
		} else {
			pouring = false
			// pouringSensorPin.Low()
		}

		status := struct {
			WaterLevel1 bool `json:"waterLevel1"`
			WaterLevel2 bool `json:"waterLevel2"`
			WaterLevel3 bool `json:"waterLevel3"`
			ValveSwitch bool `json:"valveSwitch"`
			PumpSwitch  bool `json:"pumpSwitch"`
			Pouring     bool `json:"pouring"`
		}{
			WaterLevel1: waterLevel1,
			WaterLevel2: waterLevel2,
			WaterLevel3: waterLevel3,
			ValveSwitch: valveSwitch,
			PumpSwitch:  pumpSwitch,
			Pouring:     pouring,
		}

		json.NewEncoder(w).Encode(status)
	})

	mux.HandleFunc("/submit", func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseMultipartForm(10 << 20); err != nil {
			http.Error(w, "Form error", http.StatusBadRequest)
			return
		}

		if firstRunSchedule {
			finish <- struct{}{}
		}

		days = r.Form["days"]
		initialTime = r.FormValue("initialTime")
		endTime = r.FormValue("endTime")
		daysToWeekday()

		go gardON(finish)

		// fmt.Println(isDayToday()) //tu do zmiany jak sie zaznaczy raz dzisiejszy dzien tygodnia da confirm a pozniej odznaczy i znowu sie do confirm to dalej pokazuje ze dzien jest dziesiejszy
		// fmt.Println(days)
		// fmt.Println(daysWeekday)
		// fmt.Println(initialTime)
		// fmt.Println(endTime)

		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		fmt.Fprintf(w, "Selected days: %s\nSince: %s\nUntil: %s",
			strings.Join(days, ", "),
			initialTime,
			endTime,
		)

	})

	fs := http.FileServer(http.Dir("."))
	mux.Handle("/gardON.css", fs)
	mux.Handle("/gardON.js", fs)
	mux.Handle("/logoOFF.png", fs)
	mux.Handle("/logoON.png", fs)
	mux.Handle("/logoOFFswitch.png", fs)
	mux.Handle("/logoONswitch.png", fs)

	http.ListenAndServe(":12347", mux)

}

func daysToWeekday() {

	for _, d := range days {
		switch strings.ToLower(d) {
		case "sunday":
			daysWeekday = append(daysWeekday, time.Sunday)
		case "monday":
			daysWeekday = append(daysWeekday, time.Monday)
		case "tuesday":
			daysWeekday = append(daysWeekday, time.Tuesday)
		case "wednesday":
			daysWeekday = append(daysWeekday, time.Wednesday)
		case "thursday":
			daysWeekday = append(daysWeekday, time.Thursday)
		case "friday":
			daysWeekday = append(daysWeekday, time.Friday)
		case "saturday":
			daysWeekday = append(daysWeekday, time.Saturday)
		default:
			fmt.Println("Nieznany dzień:", d)
		}
	}
}

func stringTimeToTime(a string) time.Time {
	splitedTime := strings.Split(a, ":")
	hour, _ := strconv.Atoi(splitedTime[0])
	minute, _ := strconv.Atoi(splitedTime[1])
	timeTime := time.Date(0, 0, 0, hour, minute, 0, 0, time.Local)
	return timeTime
}

func isDayToday() bool {

	for _, d := range daysWeekday {
		if d == time.Now().Weekday() {
			return true
		}
	}
	return false
}

func gardON(fin chan struct{}) {
	select {
	case <-fin:
	default:
	}

	ticker := time.NewTicker(1 * time.Second)
	// ticker := time.NewTicker(1 * time.Minute)
	for {

		select {
		case <-ticker.C:
			now := time.Date(0, 0, 0, time.Now().Hour(), time.Now().Minute(), 0, 0, time.Local)
			if pinLevel1.Read() == rpio.High {
				// pouringSensorPin.High()
				// pouring = true
				pumpPin.High()
			}
			if pinLevel3.Read() == rpio.Low {
				// pouringSensorPin.Low()
				// pouring = false
				pumpPin.Low()
			}
			if isDayToday() == true &&
				stringTimeToTime(initialTime).Before(now) &&
				now.Before(stringTimeToTime(endTime)) &&
				soilMoisturePin.Read() == rpio.High {
				valvePin.High()
			} else {
				valvePin.Low()
			}
			fmt.Println(endTime)
			firstRunSchedule = true
		case <-fin:
			daysWeekday = nil
			fmt.Println("koniec")

			return

			// fmt.Println(initialTime)
			// fmt.Println(endTime)
			// fmt.Println(now.Format(time.TimeOnly))
			// fmt.Println(daysWeekday)
			// fmt.Println(days)
			// fmt.Println(isDayToday())
			// fmt.Println(stringTimeToTime(initialTime).Before(now))
			// fmt.Println(now.Before(stringTimeToTime(endTime)))
			// fmt.Println(soilMoisturePin.Read() == rpio.High)
		}
	}
}

// -------------------------------wip---------------------------------------------------------------------------
// func stringTimeToTime(timeToChange string) time.Time {
// 	t, _ := time.Parse("15:04", timeToChange)
// 	return t
// }

// func isNowTime() bool {
// 	var now = time.Date(0, time.January, 1, time.Now().Hour(), time.Now().Minute(), 0, 0, time.UTC)
// 	if stringTimeToTime(initialTime).After(now) && stringTimeToTime(endTime).Before(now) {
// 		return true
// 	}
// 	return false
// }

// func counterToStart(initial time.Time) time.Timer {
// 	var timerToStart *time.Timer
// 	var now = time.Date(0, time.January, 1, time.Now().Hour(), time.Now().Minute(), 0, 0, time.UTC)
// 	if isNowTime() {
// 		timerToStart = time.NewTimer(0 * time.Second)
// 	} else {
// 		timerToStart = time.NewTimer(initial.Sub(now))
// 	}
// 	return *timerToStart
// }

// func counterToEnd(end time.Time) time.Timer {
// 	var timerToEnd *time.Timer
// 	var now = time.Date(0, time.January, 1, time.Now().Hour(), time.Now().Minute(), 0, 0, time.UTC)
// 	timerToEnd = time.NewTimer(end.Sub(now))
// 	return *timerToEnd
// }

// func isInitialBeforeEnd() bool {
// 	if stringTimeToTime(initialTime).Before(stringTimeToTime(endTime)) {
// 		return true
// 	}
// 	return false
// }

// func securitySystem(ch chan int){
// 	for{
// 		ch<-0
// 		if waterLevel3 == true{
// 			pumpPin.Low()
// 			pumpSwitch = false
// 		}
// 	}

// }

// func autoRefil() {
// 	if waterLevel1 == false {
// 		pumpPin.High()
// 		pumpSwitch = true
// 	}
// 	if waterLevel3 == true {
// 		pumpPin.Low()
// 		pumpSwitch = false
// 	}

// }

// func scheduleModeOn() {

// }

// --------------------------------------------------------------------------------------------------------
// func timeToStart(){
// 	for _, d := range days{

// 		if <
// 	}
// }

// func isDayMached() {
// 	ticker := time.NewTicker(10*time.Second)
// 	for _, d := range days{
// 		if strings.EqualFold(d, now.Weekday().String)
// 		<- ticker.C
// 	}

// 	ttt := time.NewTimer()
// }

// func isTimeBetween(){
// 	ticker := time.NewTicker(10*time.Second)
// 	for {
// 		if time.Now().Format("15:04")>=initialTime&&time.Now().Format("15:04") <=endTime
// 	}
// }
