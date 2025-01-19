export default async function handler(req, res) {
    const apiKey = process.env.GrasAI;

    if (!apiKey) {
        return res.status(500).json({ error: "API key is not configured." });
    }

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
