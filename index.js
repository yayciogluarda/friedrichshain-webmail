import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import authRoute from "./routes/authRoute.js";

const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Session middleware setup (required for session handling)
app.use(session({
  secret: '08915440dd4c280182c3f5fff9496d6df98c1f9ab403d89a9f3c2e562d7d05eeb3834b8be96f0d4aab33614f6da00d09edb4e82991c40dd567ec4172a00e4f32', // Replace with a secure key
  resave: false,
  saveUninitialized: true
}));

// Middleware to protect routes
function isAuthenticated(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  res.redirect('/login'); // Redirect if not authenticated
}

// Use the middleware for email-related routes
app.use('/emails', isAuthenticated);

const emails = [
  {
    id: 13,
    sender: "Officer Erik Jansen <erik.jansen@polizei-friedrichshain21.de>",
    subject: "Where Are You?",
    date: "08 October 2024 08:45",
    body: `Detective Heisenberg,<br><br>
I’m getting really worried—I haven’t been able to reach you, and no one else seems to know where you are. You haven’t been responding to calls or emails, and this isn’t like you. Please let me know you’re okay as soon as you see this. If something’s wrong, we’ll figure it out together, but I need to know you’re safe.<br><br>
Looking forward to hearing from you.<br><br>
Best regards,<br>
Officer Erik Jansen<br>
Friedrichshain Police Station 21`,
replies: []
  },
  {
    id: 12,
    sender: "Officer Julia Richter <julia.richter@polizei-friedrichshain21.de>",
    subject: "Follow-Up on Toxicology Report",
    date: "07 October 2024 15:34",
    body: `Detective Heisenberg,<br><br>
I wanted to bring up something interesting regarding the toxicology report on Dr. Falkenberg. The report came back negative for any substances, including alcohol. However, several witnesses at the event mentioned seeing him drinking wine that evening. Could it be worth re-examining the materials or running the analysis again to rule out any errors or overlooked substances?<br><br>
Let me know your thoughts when you get a chance.<br><br>
Best regards,<br>
Officer Julia Richter<br>
Friedrichshain Police Station 21`,
    replies: []
  },
  {
    id: 11,
    sender: "Unknown Sender <dropthecase@securemail.com>",
    subject: "Drop the Case",
    date: "07 October 2024 12:12",
    body: `<b>Warning! This email comes outside of your institute's servers. Beware of scam, do not open or download attachments.</b><hr><hr>
    Detective Heisenberg,<br><br>
You’re digging into matters that are better left alone. Stop investigating Max's death, or things will end badly. This is your only warning.<br><br>`,
    replies: [
      {
        sender: "Detective Laura Heisenberg <laura.heisenberg@polizei-friedrichshain21.de>",
        date: "07 October 2024 12:28",
        body: `Who is this? Threatening a police investigation is a serious offense. I suggest you think carefully about your next steps.<br><br>
        <br>
Detective Heisenberg`
      },
      {
        sender: "<dropthecase@securemail.com>",
        date: "07 October 2024 12:45",
        body: `Consider this my final warning, Detective. Walk away, or you’ll regret it.<br><br>
        You play stupid games... you win stupid prizes.
        <br>`
      }
    ]
  },
  {
    id: 10,
    sender: "Officer Erik Jansen <erik.jansen@polizei-friedrichshain21.de>",
    subject: "Webcam Footage",
    date: "07 October 2024 10:02",
    body: `Detective Heisenberg,<br><br>
  I have left a printed screenshot of the webcam footage from 03.10. on your desk as requested. Let me tell you, it wasn’t easy convincing them to provide this to the police. They were incredibly resistant, especially without knowing why we needed it.<br><br>
  <br>They kept asking me what they had to do with the murder and I didn't know what to answer? Hell, you didn't even tell me why we need this? I trust you, but I need you to communicate with me.<br>
  Let me know if you need anything else from their system. I’ll do my best to push further if necessary.<br><br>
  Best regards,<br>
  Erik`,
  replies: [{
    sender: "Detective Laura Heisenberg <laura.heisenberg@polizei-friedrichshain21.de>",
    date: "07 October 2024 10:15",
    body: `Thank you, Erik. I appreciate all the effort you’ve put into getting this footage—it could be crucial.<br><br>
  I’d rather talk about important matters like this face-to-face, but I’m very close to solving this case. I’ll schedule a meeting soon to go over the details and discuss the next steps.<br><br>
  Thanks again!<br><br>
  Laura`
  }]
  },
  {
    id: 9,
    sender: "Dr. Alex Brunner <alex.brunner@polizei-friedrichshain21.de>",
    subject: "Re: Quick Question About Dr. Falkenberg’s Case",
    date: "07 October 2024 09:23",
    body: `Hey Laura,<br><br>
Great to hear from you! I’m doing well, just the usual chaos at the lab. The results came back negative? Now that’s interesting.<br><br>

To answer your question, yes, you can calculate the time of ingestion if you find out what the substance is. 
All you need to know is the tmax of the drug, which is the time at which the highest concentration of the drug is in the blood. 
That must have been the time the poor guy died. From there, it’s a matter of simple math: just subtract the tmax 
(so the amount of time it takes for the substance to reach the highest concentration) from the time of death to figure out when the poor guy drank the poison. 
Call me if you need a scientific article on tmax of specific substances – I can certainly help with that.
<br><br>
Best,<br>
Alex <br>

<blockquote style="font-family:monospace; background-color:#f9f9f9; border-left:5px solid #ddd; padding:10px;">
<b>Detective Laura Heisenberg <laura.heisenberg@polizei-friedrichshain21.de> on 06.10.2024 14:52 </b><br>
<em>Hi Alex!<br><br>
I hope you’re doing well! I wanted to reach out because I’m in a bit of a bind with the case I’m working on. As you might have heard, Dr. Falkenberg died during his speech at the launch of amnolimumab. We suspect he was poisoned, but the toxicology reports came back negative, which I find really absurd.<br><br>
I’m wondering if there’s any way to calculate the time of ingestion if we know the time of death and the potential substance involved. I’ve ordered a testing kit myself, the toxicology departments seems to take ages nowadays. I’d really appreciate your insight on this!
Let me know if you have a moment to chat. I miss our coffee breaks at the lab!<br><br>
Take care,<br>
Laura<em>
</blockquote>`,
    replies: []
  },
  {
    id: 8,
    sender: "BioTech Diagnostic Products <support@biotechdiagnostics.com>",
    subject: "Instruction Manual for Drug Testing Kit Strip",
    date: "06 October 2024 13:21",
    body: `Dear Laura Heisenberg,<br><br>
  Thank you for reaching out to BioTech Diagnostic Products regarding our drug testing kits. As requested, please find attached the manual for interpreting the results of our standard opioid test strips.<br><br>
  Please dip the strip in the sample material for 20 seconds and compare the colors with the manual. If you have any questions or require further assistance, please don’t hesitate to contact us.<br><br>
  We hope this helps with your investigation.<br><br>
  Best regards,<br>
  Customer Support Team<br>
  BioTech Diagnostic Products<br>
  support@biotechdiagnostics.com<br>`,
  attachments: [
    {
      filename: "manual.png",
      path: "/images/manual.png"
    }
  ],
  replies: []
  },
  {
    id: 7,
    sender: "Officer Erik Jansen <erik.jansen@polizei-friedrichshain21.de>",
    subject: "Ticket per your request",
    date: "06 October 2024 10:32",
    body: `Detective Heisenberg,<br><br>
As requested, I’ve gathered the subway ticket. I am attaching a photo.<br><br>
Let me know if additional data is needed for now.<br><br>
Best regards,<br>
Officer Erik Jansen<br>
Friedrichshain Police Station 21`,
attachments: [
  {
    filename: "ticket.png",
    path: "/images/ticket.png"
  }
],
    replies: [],
  },
  {
    id: 6,
    sender: "Officer Erik Jansen <erik.jansen@polizei-friedrichshain21.de>",
    subject: "Unidentified Fingerprint Found on Dr. Falkenberg’s Mobile Phone",
    date: "06 October 2024 10:21",
    body: `Dear Detective Heisenberg,<br><br>
  As per your request, I’m sending over the fingerprint we collected from Dr. Falkenberg’s mobile phone. The fingerprint does not match Dr. Falkenberg’s own prints, and it is currently under investigation to determine its origin. We are prioritizing this lead, and I will keep you updated with any developments.<br><br>
  The fingerprint image has been attached to this email for your review.<br><br>
  Please let me know if there’s anything else I can assist with regarding this case.<br><br>
  Best regards,<br>
  Officer Erik Jansen<br>
  Friedrichshain Police Station 21`,
    attachments: [
      {
        filename: "fingerprint.png",
        path: "/images/fingerprint.png"
      }
    ],
    replies: []
  },
  {
    id: 5,
    sender: "Officer Erik Jansen <erik.jansen@polizei-friedrichshain21.de>",
    subject: "Substance Analysis Report - Exhibit FH392-01",
    date: "05 October 2024 10:45",
    body: `Detective Heisenberg,<br><br>
  As requested, I’ve compiled the following report regarding the analysis of the substance residue found at the scene. Let me know if there’s anything else you need.<br><br>
  <blockquote style="font-family:monospace; background-color:#f9f9f9; border-left:5px solid #ddd; padding:10px;">
  <b>Subject of Report:</b> Analysis of Controlled Substance Residue<br><br>
  <b>Incident Summary:</b><br>
  On the evening of October 2, 2024, an item was collected from an individual present at the RevoluPharma facility following the death of Dr. Maximilian Falkenberg. The item in question—a small, clear ziplock bag with visible white powder residue—was submitted for analysis by the Berlin Forensic Laboratory to determine the nature of the substance.<br><br>
  <b>Description of Evidence Collected:</b><br>
  1. <b>Exhibit #FH392-01:</b><br>
     &bull; <b>Item:</b> Small, clear ziplock bag<br>
     &bull; <b>Contents:</b> Residual white powder adhering to the interior of the bag<br>
     &bull; <b>Dimensions:</b> Approx. 4 cm x 4 cm<br>
     &bull; <b>Status:</b> Secured in evidence bag for forensic testing<br><br>
  <b>Laboratory Analysis Report:</b><br>
  <b>Date of Analysis:</b> October 3, 2024<br>
  <b>Conducted by:</b> Berlin Forensic Laboratory, Toxicology Division<br><br>
  <b>Analytical Findings:</b><br>
  1. <b>Substance Identification:</b><br>
     &bull; <b>Method:</b> Gas Chromatography-Mass Spectrometry (GC-MS) and Fourier Transform Infrared Spectroscopy (FTIR)<br>
     &bull; <b>Result:</b> Positive identification of cocaine hydrochloride<br>
     &bull; <b>Purity Level:</b> Approximately 82% pure cocaine<br>
  2. <b>Additional Testing Results:</b><br>
     &bull; <b>Presence of Adulterants:</b> Traces of caffeine and levamisole detected, both common cutting agents found in street cocaine<br>
     &bull; <b>Quantity:</b> Insufficient residue for weight measurement; classified as trace residue<br><br>
  <b>Conclusion:</b><br>
  The analysis confirmed the presence of cocaine hydrochloride in Exhibit #FH392-01. The purity and composition are consistent with substances commonly used for personal consumption. This exhibit has been cataloged and retained in police custody as part of the ongoing investigation.<br><br>
  <b>Report Compiled by:</b><br>
  Officer Erik Jansen<br>
  </blockquote>
  <br>
  Looking forward to your thoughts.<br><br>
  Best,<br>
  Erik`,
  replies: [
    {
      sender: "Detective Laura Heisenberg <laura.heisenberg@polizei-friedrichshain21.de>",
      date: "06 October 2024 11:02",
      body: `Hmm, interesting. Let’s keep this detail in mind as we progress. Thanks for pulling this together, Erik.<br><br>
    Laura`
    }
  ]
  },
  {
    id: 4,
    sender: "Officer Julia Richter <julia.richter@polizei-friedrichshain21.de>",
    subject: "Suspicious Activity Report - Kottbusser Tor",
    date: "01 October 2024 14:45",
    body: `Dear Detective Heisenberg,<br><br>
I am writing to inform you about a recent report we received concerning suspicious behavior in the Kottbusser Tor area. Over the past few nights, a group of individuals has been observed congregating in the same spots, often late at night. There have been reports of loud conversations and sudden movements near some parked vehicles, which seem out of place. Some local residents have expressed concern, and it seems this group may be involved in something more serious. <br><br>
I recommend reviewing the footage from the security cameras positioned around the plaza and surrounding streets. If you need any assistance with this, please let me know. I'll be in the area tonight and can help with a physical assessment if necessary.<br><br>
Best regards,<br>
Officer Julia Richter`,
    replies: [
      {
        sender: "Detective Laura Heisenberg <laura.heisenberg@polizei-friedrichshain21.de>",
        date: "01 October 2024 16:10",
        body: `Thanks for the update, Officer Richter. I'll begin reviewing the footage tonight and coordinate with the patrol team for any further investigation. If anything unusual comes up, I’ll let you know immediately. Let's stay in touch on this. I'll check back in tomorrow morning with any updates.<br><br>
Best,<br>
Detective Laura Heisenberg`
      }
    ],
  },
  {
    id: 3,
    sender: "Julia Richter <julia.richter@polizei-friedrichshain21.de>",
    subject: "Briefing on Organized Crime Ring",
    date: "28 September 2024 13:30",
    body: `Detective Heisenberg,<br><br>
I hope this email finds you well. I’m forwarding you the latest intelligence on the organized crime ring that has been operating in Friedrichshain. We’ve been tracking their activities for a few months, and we believe they may be behind several high-profile thefts and assaults. Recently, we've seen a rise in their activities, particularly in the form of burglaries targeting upscale apartments. There are also indications that they may be involved in illicit drug distribution.<br><br>
I need you to go over the latest report and focus on the suspects’ profiles. We’ve identified a few key individuals, but there’s still a lot of work to be done to tie them to specific crimes. A briefing session is scheduled for 20 November, so please review the information ahead of time. Let me know if you need anything else or have any questions.<br><br>
Best,<br>
Police Officer Julia Richter`,
    replies: [],
  },
  {
    id: 2,
    sender: "Forensic Lab - Dr. Alex Brunner <alex.brunner@polizei-friedrichshain21.de>",
    subject: "Forensic Results on the Smith Case",
    date: "24 September 2024 12:15",
    body: `Hey Laura!<br><br>
The forensic analysis of the Smith case is now complete. We’ve been able to confirm that the DNA found at the scene matches that of the suspect, Marcus Vogel, who had previously been arrested for a different robbery attempt in the area. This is a significant breakthrough in the case. <br><br>
Additionally, our lab technicians have identified several other trace evidence samples that could link Vogel to the crime scene, including a pair of gloves that he likely discarded after entering the house. There’s also an unidentified fiber that was found near the victim's desk. We believe this could belong to one of the other individuals he was seen with, but we’ll need more analysis to be certain. <br><br>
I would suggest meeting with the team to discuss the next steps. Let me know if you need any further assistance or have additional questions.<br><br>
Kind regards,<br>
Dr. Alex Brunner`,
    replies: [
      {
        sender: "Detective Laura Heisenberg <laura.heisenberg@polizei-friedrichshain21.de>",
        date: "24 September 2024 12:45",
        body: `Thank you for the thorough report, Dr. Brunner. I’ll go over the details and update the case file accordingly. I’ll also reach out to the team to coordinate the next steps. I’ll keep you posted if I need anything further. Appreciate your help.<br><br>
Best,<br>
Detective Laura Heisenberg`
      }
    ],
  },
  {
    id: 1,
    sender: "IT Department <it@polizei-friedrichshain21.de>",
    subject: "Password Expiry Reminder - Change Required in 6 Days",
    date: "15 September 2024 14:00",
    body: `Dear Laura Heisenberg,<br><br>
This is a reminder that your current password for the Police Station 21 network at <b>friedrichshain-webmail.de</b> will expire in 6 days. To maintain security across our systems, please update your password by 21.09.2024.<br><br>
Password Requirements<br>
For security compliance, your new password must meet the following criteria:<br><br>
<ul>
  <li>At least one special character (e.g., !, @, #, $)</li>
  <li>At least one number (0-9)</li>
  <li>A minimum of 8 characters</li>
</ul><br>
Tips for Choosing a Strong, Memorable Password<br>
Creating a secure password doesn’t have to be difficult. Here are some techniques to help you choose a strong password that’s easy to remember:<br><br>
<ol>
  <li><strong>Use a Passphrase</strong><br>
    Think of a sentence or phrase that’s meaningful to you, then abbreviate it.<br>
    Example: “I always drink coffee before work”<br>
    Password: I@lw@ysDr!nkC0ff3e
  </li><br>
  <li><strong>Combine Characters and Symbols</strong><br>
    Mix uppercase and lowercase letters, numbers, and symbols for added security.<br>
    Example: “sunshine2024” becomes 5un$h!ne2024
  </li><br>
  <li><strong>Substitute Characters</strong><br>
    Replace certain letters with numbers or symbols that look similar.<br>
    Example: E → 3, S → $, I → 1, O → 0, A→@
  </li><br>
  <li><strong>Create an Acronym</strong><br>
    Take a memorable phrase or quote and turn it into an acronym.<br>
    Example: “To be or not to be, that is the question”<br>
    Password: Tb0n2b@TIQ!
  </li><br>
  <li><strong>Unique Endings for Each Account</strong><br>
    Start with a base password, then add unique endings for each account.<br>
    Example Base: !P@ssw0rd2024<br>
    Unique Endings: !P@ssw0rd2024MAIL for e-mail accounts, !P@ssw0rd2024BANK for bank accounts etc.
  </li><br>
  <li><strong>Use Random Words</strong><br>
    Choose three to four random, unrelated words and link them with symbols or numbers.<br>
    Example: Fox!River#Apple77
  </li><br>
</ol><br>
Please contact us if you encounter any issues during the password change process. Thank you for helping us keep our network secure.<br><br>
Best Regards,<br>
IT Support Team<br>
Police Station 21 Friedrichshain`,
    replies: [],
  },
];




// Middleware setup
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get('/login', (req, res) => {
  res.render('login', { error: null }); // Initial render with no error
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Replace with real validation logic
  if (email === "laura.heisenberg@polizei-friedrichshain21.de" && password === "gr3t@07102012MAIL") {
    req.session.isLoggedIn = true; // Set session as authenticated
    return res.redirect('/emails');
  }

  res.render('login', { error: "Invalid email or password" });
});

// Use authentication route
app.use("/", authRoute);

// Emails list
app.get('/emails', (req, res) => {
  res.render('emails', { emails });
});

// Single email viewer
app.get('/emails/:id', (req, res) => {
  const emailId = parseInt(req.params.id, 10); // Ensure ID is an integer
  const email = emails.find(e => e.id === emailId);
  if (email) {
    res.render('viewemail', { email });
  } else {
    res.status(404).send('Email not found');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
