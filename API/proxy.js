export default async function handler(req, res) {
    const apiKey = process.env.GrasAI;

    if (!apiKey) {
        console.error("API key is missing.");
        return res.status(500).json({ error: "API key is not configured." });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed. Use POST." });
    }

    const { model = "gpt-4", messages, temperature = 0.7 } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid 'messages' format. It must be an array." });
    }

    const endpoint = "https://api.openai.com/v1/chat/completions";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                messages,
                temperature,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenAI API error:", errorData);
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in proxy:", error);
        res.status(500).json({ error: "Failed to fetch data from OpenAI." });
    }
}
