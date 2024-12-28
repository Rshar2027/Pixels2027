export default async function handler(req, res) {
    const apiKey = process.env.GrasAI;

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const endpoint = "https://api.openai.com/v1/chat/completions";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in proxy:", error);
        res.status(500).json({ error: "Failed to fetch data from OpenAI" });
    }
}