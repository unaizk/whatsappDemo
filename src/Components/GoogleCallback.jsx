import { useEffect, useState } from "react";

export default function GoogleCallback() {
    const [status, setStatus] = useState("Processing Google Login...");

    useEffect(() => {
        // Extract the "code" from the URL query string
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
            setStatus("No authorization code found in URL.");
            return;
        }

        const sendToBackend = async () => {
            try {
                const apiResponse = await fetch(
                    "http://localhost:8080/api/v1/SocialConnect/oauth/google-connect",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Api-Key": "devcom-e0e8250708b663ec",
                            "dbname": "mysale59153239284454",
                        },
                        body: JSON.stringify({
                            code: code,
                            companyId: "6358dc15fa7df868016785",
                        })
                    }
                );

                if (!apiResponse.ok) {
                    const errorText = await apiResponse.text();
                    throw new Error(`Backend Error (${apiResponse.status}): ${errorText}`);
                }

                const result = await apiResponse.json();
                if (result.success) {
                    setStatus("Gmail Connected Successfully! You can safely go back to Home.");
                } else {
                    setStatus("Backend failed to connect: " + result.message);
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setStatus("Connection Failed: " + err.message);
            }
        };

        // Ensure we only fire this once
        sendToBackend();
    }, []);

    return (
        <div style={{ padding: 40 }}>
            <h2>{status}</h2>
            <button onClick={() => window.location.href = "/"}>Go Back to Home</button>
        </div>
    );
}
