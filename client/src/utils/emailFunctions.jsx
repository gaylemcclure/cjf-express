import { compileWelcomeTemplate, compileBandTemplate, compileVolunteerTemplate, sendMail, compileContactTemplate } from "@/lib/email";

export async function SendWelcome(email, leader, code) {
  await sendMail({
    to: email,
    name: leader,
    subject: "Castlemaine Jazz Festival Welcome",
    body: compileWelcomeTemplate(leader, "https://localhost:3000/home", code),
  });
}

export async function SendVolunteer(email, name, phone, address, age, ecName, ecPhone, licence, rsa, lifting, roles) {
  await sendMail({
    to: email,
    name: name,
    subject: "Castlemaine Jazz Festival Volunteer Application",
    body: compileVolunteerTemplate(name, "https://localhost:3000/home", phone, address, age, ecName, ecPhone, licence, rsa, lifting, roles),
  });
}

export async function SendBand(email, leader, volname) {
  await sendMail({
    to: email,
    name: leader,
    subject: "Castlemaine Jazz Festival Band Application",
    body: compileBandTemplate(leader, "https://localhost:3000/home", volname),
  });
}

export async function SendContact(name, email, text) {
  await sendMail({
    to: "gaylekdennison@gmail.com",
    name: "Committee Member",
    subject: "Contact Form Submission",
    body: compileContactTemplate(name, email, text),
  });
}
