#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>

using namespace std;

struct WordEntry {
    string word;
    string hint;
};

int main() {
    WordEntry vocab[] = {
        {"gregarious", "Fond of company; sociable."},
        {"ephemeral", "Lasting for a very short time."},
        {"lucid", "Expressed clearly; easy to understand."},
        {"vex", "To make someone feel annoyed or worried."},
        {"benevolent", "Well meaning and kindly."}
    };

    const int NUM_WORDS = sizeof(vocab) / sizeof(vocab[0]);
    srand(static_cast<unsigned int>(time(0)));
    int index = rand() % NUM_WORDS;

    string guess;
    cout << "Welcome to the Vocabulary Builder Game!\n";
    cout << "Guess the word based on the hint below:\n";
    cout << "Hint: " << vocab[index].hint << endl;
    cout << "\nYour guess: ";
    getline(cin, guess);

    if (guess == vocab[index].word) {
        cout << "Correct! Well done.\n";
    } else {
        cout << "Oops! The correct word was: " << vocab[index].word << endl;
    }

    return 0;
}
