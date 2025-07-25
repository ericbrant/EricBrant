import java.util.*;

class TriviaQuestion {
    String question;
    List<String> options;
    int correctIndex;

    TriviaQuestion(String question, List<String> options, int correctIndex) {
        this.question = question;
        this.options = options;
        this.correctIndex = correctIndex;
    }

    boolean isCorrect(int choice) {
        return choice == correctIndex;
    }
}

public class TriviaGame {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<TriviaQuestion> questions = Arrays.asList(
            new TriviaQuestion(
                "What planet is known as the Red Planet?",
                Arrays.asList("Earth", "Mars", "Jupiter", "Saturn"),
                1
            ),
            new TriviaQuestion(
                "Who wrote 'Romeo and Juliet'?",
                Arrays.asList("Mark Twain", "William Shakespeare", "Jane Austen", "Charles Dickens"),
                1
            ),
            new TriviaQuestion(
                "What is the capital of France?",
                Arrays.asList("Rome", "Paris", "Madrid", "Berlin"),
                1
            ),
            new TriviaQuestion(
                "Which element has the chemical symbol 'O'?",
                Arrays.asList("Gold", "Oxygen", "Silver", "Iron"),
                1
            ),
            new TriviaQuestion(
                "In what year did the Titanic sink?",
                Arrays.asList("1905", "1912", "1918", "1921"),
                1
            )
        );

        int score = 0;
        System.out.println("📚 Welcome to the Trivia Quiz!");
        System.out.println("Answer the questions by typing the number of your choice.\n");

        for (int i = 0; i < questions.size(); i++) {
            TriviaQuestion q = questions.get(i);
            System.out.println("Q" + (i + 1) + ": " + q.question);
            for (int j = 0; j < q.options.size(); j++) {
                System.out.println((j + 1) + ". " + q.options.get(j));
            }
            System.out.print("Your answer: ");
            int choice = scanner.nextInt() - 1;

            if (q.isCorrect(choice)) {
                System.out.println("✅ Correct!\n");
                score++;
            } else {
                System.out.println("❌ Wrong. The correct answer was: " + q.options.get(q.correctIndex) + "\n");
            }
        }

        System.out.println("🎯 Game Over! You scored " + score + " out of " + questions.size());
        if (score == questions.size()) {
            System.out.println("🏆 Perfect score! Trivia champion!");
        } else if (score >= 3) {
            System.out.println("👏 Nice job! You're trivia-savvy.");
        } else {
            System.out.println("😅 Better luck next time. Keep learning!");
        }

        scanner.close();
    }
}
