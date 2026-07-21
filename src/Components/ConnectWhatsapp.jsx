const CONFIG_ID = "841817205531705";

export default function ConnectWhatsapp() {
    // No useEffect needed here anymore!

    const connectWhatsapp = () => {
        if (!window.FB) {
            alert("Facebook SDK not loaded yet. Please wait a second and try again.");
            return;
        }

        // NOTICE: We pass a normal function here, NOT an async function!
        window.FB.login(
            function (response) {
                console.log(JSON.stringify(response, null, 2));
                console.log(response);
                console.log(response.authResponse);

                if (!response.authResponse) {
                    alert("User cancelled login.");
                    return;
                }

                const code = response.authResponse.code;
                console.log("Authorization Code:", code);

                               const sendToBackend = async () => {
                    try {
                        const apiResponse = await fetch(
                            "https://mysaleappcompanyapi-7lfpakcp7q-el.a.run.app/api/v1/SocialConnect/oauth/connect",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Api-Key": "devcom-e0e8250708b663ec",
                                    "dbname": "mysale59153239284454",
                                    // "Authorization": "Bearer YOUR_USER_TOKEN" // <-- You might be missing this!
                                },
                                body: JSON.stringify({
                                    code: code,
                                    companyId: "6358dc15fa7df868016785",
                                })
                            }
                        );

                        // 1. Check if the backend request was successful
                        if (!apiResponse.ok) {
                            // If it failed (like a 401 Unauthorized), read the text instead of JSON
                            const errorText = await apiResponse.text();
                            throw new Error(`Backend Error (${apiResponse.status}): ${errorText}`);
                        }

                        // 2. Only parse as JSON if the request was successful
                        const result = await apiResponse.json();
                        console.log(result);

                        if (result.success) {
                            alert("WhatsApp Connected Successfully!");
                        } else {
                            alert("Backend failed to connect: " + result.message);
                        }

                    } catch (err) {
                        console.error("Fetch Error:", err);
                        alert("Connection Failed: " + err.message);
                    }
                };


                sendToBackend();
            },
            {
                config_id: CONFIG_ID,
                response_type: "code",
                override_default_response_type: true
            }
        );
    };

    return (
        <button onClick={connectWhatsapp}>
            Connect WhatsApp
        </button>
    );
}
