const chatBox = document.getElementById("chat-box");
const question = document.getElementById("question");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, cls) {

    const div = document.createElement("div");

    div.className = `message ${cls}`;

    div.innerText = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

    return div;
}

async function sendMessage() {

    const text = question.value.trim();

    if (!text) return;

    addMessage(text, "user");

    question.value = "";

    const loading = addMessage("Thinking...", "ai");

    try {

        const response = await fetch("http://localhost:4000/api/content", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: text
            })

        });

        const data = await response.json();

        if (data.success) {
            loading.innerText = data.result;
        } else {
            loading.innerText = data.message;
        }

    } catch (err) {

        console.error(err);

        loading.innerText = "Unable to connect to server.";

    }

}

sendBtn.addEventListener("click", sendMessage);

question.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        sendMessage();

    }

});