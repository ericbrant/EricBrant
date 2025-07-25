#!/bin/bash

# Vocabulary quiz artifact
declare -A questions
declare -A answers
declare -A choices

# Questions and choices
questions[0]="Choose the best synonym for 'perfunctory':"
choices[0]="1) Careful  2) Thoughtless  3) Excited  4) Precise"
answers[0]=2

questions[1]="Select the antonym of 'obstinate':"
choices[1]="1) Flexible  2) Stubborn  3) Quiet  4) Energetic"
answers[1]=1

questions[2]="In context: 'Her capricious mood shifts made planning difficult.' What does 'capricious' mean?"
choices[2]="1) Predictable  2) Calculated  3) Whimsical  4) Steady"
answers[2]=3

questions[3]="Analogies: ARDUOUS is to EASY as..."
choices[3]="1) MASSIVE is to HEAVY  2) FREQUENT is to RARE  3) NEUTRAL is to OBJECTIVE  4) ELATED is to JOYFUL"
answers[3]=2

score=0
total=${#questions[@]}

echo "🧪 Welcome to the Linux Vocabulary Quiz!"
echo "Answer the questions by entering the number of your choice."
echo

for i in "${!questions[@]}"; do
    echo "Q$((i+1)): ${questions[$i]}"
    echo "${choices[$i]}"
    read -p "Your answer (1-4): " choice
    if [ "$choice" -eq "${answers[$i]}" ]; then
        echo "✅ Correct!"
        ((score++))
    else
        echo "❌ Incorrect. The correct answer was: ${answers[$i]}"
    fi
    echo
done

echo "🎯 Final Score: $score out of $total"
if [ "$score" -eq "$total" ]; then
    echo "🏆 Perfect! You're a vocabulary master!"
elif [ "$score" -ge $((total / 2)) ]; then
    echo "👏 Well done! You’ve got solid verbal reasoning skills."
else
    echo "😅 Keep practicing! Language is a lifelong journey."
fi
