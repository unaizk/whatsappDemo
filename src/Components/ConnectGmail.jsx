export default function ConnectGmail() {
    const connectGmail = () => {
        // Your Google credentials from AppSettings
        const clientId = "603599246873-s0te3uepms6lp1huuh1an1feqc98nkjr.apps.googleusercontent.com";
        const redirectUri = encodeURIComponent("https://localhost:5173/auth/google/callback");
        const scope = encodeURIComponent("https://www.googleapis.com/auth/gmail.send");
        
        // Construct the Google OAuth URL
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

        // Redirect the entire page to Google
        window.location.href = googleAuthUrl;
    };

    return (
        <button onClick={connectGmail}>
            Connect Gmail
        </button>
    );
}
