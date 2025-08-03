// trivia-server.go

package main

import (
    "encoding/json"
    "log"
    "math/rand"
    "net/http"
    "time"
)

// Question represents a trivia question with choices.
type Question struct {
    ID       int      `json:"id"`
    Prompt   string   `json:"prompt"`
    Choices  []string `json:"choices"`
    Answer   int      `json:"-"`
}

var questions = []Question{
    {ID: 1, Prompt: "What is the capital of France?", Choices: []string{"Berlin", "Paris", "Rome", "Madrid"}, Answer: 1},
    {ID: 2, Prompt: "Who painted the Mona Lisa?", Choices: []string{"Da Vinci", "Van Gogh", "Picasso", "Rembrandt"}, Answer: 0},
    {ID: 3, Prompt: "What is 7 × 8?", Choices: []string{"54", "56", "58", "60"}, Answer: 1},
}

func main() {
    rand.Seed(time.Now().UnixNano())
    http.HandleFunc("/questions", questionsHandler)
    log.Println("Trivia server listening on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func questionsHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    idx := rand.Intn(len(questions))
    q := questions[idx]

    out := struct {
        ID      int      `json:"id"`
        Prompt  string   `json:"prompt"`
        Choices []string `json:"choices"`
    }{q.ID, q.Prompt, q.Choices}

    json.NewEncoder(w).Encode(out)
}
