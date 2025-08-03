// MainActivity.kt

package com.example.triviaapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

// Data model matching the server JSON
data class Question(
    val id: Int,
    val prompt: String,
    val choices: List<String>
)

interface TriviaApi {
    @GET("/questions")
    suspend fun getRandomQuestion(): Question
}

class TriviaViewModel : androidx.lifecycle.ViewModel() {
    private val api = Retrofit.Builder()
        .baseUrl("http://10.0.2.2:8080")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
        .create(TriviaApi::class.java)

    var question by mutableStateOf<Question?>(null)
        private set

    var selectedChoice by mutableStateOf<Int?>(null)
        private set

    var feedback by mutableStateOf<String?>(null)
        private set

    fun loadQuestion() {
        feedback = null
        selectedChoice = null

        viewModelScope.launch {
            question = api.getRandomQuestion()
        }
    }

    fun submitAnswer() {
        val q = question ?: return
        val correct = listOf(1, 0, 1)  // mirror Go server’s answers
        feedback = if (selectedChoice == correct[q.id - 1]) {
            "✅ Correct!"
        } else {
            "❌ Incorrect. Try again!"
        }
    }

    fun choose(index: Int) {
        selectedChoice = index
    }
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val vm: TriviaViewModel = viewModel()
            Surface(color = MaterialTheme.colors.background) {
                TriviaScreen(vm)
            }
            LaunchedEffect(Unit) {
                vm.loadQuestion()
            }
        }
    }
}

@Composable
fun TriviaScreen(vm: TriviaViewModel) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        vm.question?.let { q ->
            Text(text = q.prompt, style = MaterialTheme.typography.h6)

            q.choices.forEachIndexed { idx, choice ->
                Card(
                    shape = RoundedCornerShape(8.dp),
                    elevation = 4.dp,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { vm.choose(idx) }
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(12.dp)
                    ) {
                        RadioButton(
                            selected = (vm.selectedChoice == idx),
                            onClick = { vm.choose(idx) }
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(text = choice)
                    }
                }
            }

            vm.feedback?.let {
                Text(text = it, style = MaterialTheme.typography.subtitle1)
            }

            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                Button(
                    onClick = { vm.submitAnswer() },
                    enabled = (vm.selectedChoice != null)
                ) {
                    Text("Submit")
                }
                Button(onClick = { vm.loadQuestion() }) {
                    Text("Next")
                }
            }
        } ?: run {
            CircularProgressIndicator(modifier = Modifier.align(Alignment.CenterHorizontally))
        }
    }
}
