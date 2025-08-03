// TriviaApp.swift

import SwiftUI
import Combine

struct Question: Codable, Identifiable {
    let id: Int
    let prompt: String
    let choices: [String]
}

class TriviaViewModel: ObservableObject {
    @Published var question: Question?
    @Published var selectedChoice: Int?
    @Published var feedback: String?

    private var cancellable: AnyCancellable?

    func loadQuestion() {
        feedback = nil
        selectedChoice = nil
        guard let url = URL(string: "http://localhost:8080/questions") else { return }

        cancellable = URLSession.shared.dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: Question.self, decoder: JSONDecoder())
            .receive(on: DispatchQueue.main)
            .sink(
                receiveCompletion: { _ in },
                receiveValue: { [weak self] q in self?.question = q }
            )
    }

    func submitAnswer() {
        guard let q = question, let choice = selectedChoice else { return }
        let correct = [1, 0, 1]
        feedback = (correct[q.id - 1] == choice)
            ? "✅ Correct!"
            : "❌ Incorrect. Try again!"
    }
}

struct ContentView: View {
    @StateObject private var vm = TriviaViewModel()

    var body: some View {
        VStack(spacing: 20) {
            if let q = vm.question {
                Text(q.prompt)
                    .font(.title2)
                    .multilineTextAlignment(.center)

                ForEach(q.choices.indices, id: \.self) { idx in
                    Button(action: { vm.selectedChoice = idx }) {
                        HStack {
                            Text(q.choices[idx])
                            Spacer()
                            if vm.selectedChoice == idx {
                                Image(systemName: "checkmark.circle.fill")
                                    .foregroundColor(.blue)
                            }
                        }
                        .padding()
                        .background(RoundedRectangle(cornerRadius: 8).stroke())
                    }
                }

                if let fb = vm.feedback {
                    Text(fb).font(.headline)
                }

                HStack {
                    Button("Submit") { vm.submitAnswer() }
                        .disabled(vm.selectedChoice == nil)
                    Button("Next") { vm.loadQuestion() }
                }
            } else {
                Text("Loading…")
            }
        }
        .padding()
        .onAppear { vm.loadQuestion() }
    }
}

@main
struct TriviaApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
