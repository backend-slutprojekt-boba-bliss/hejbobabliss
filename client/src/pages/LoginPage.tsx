import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

async function loginUser(email: string, password: string) {
	try {
		const response = await fetch("/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			// Successful login logic
			console.log("Login successful");
		} else {
			// Handle login error
			console.log("Login failed");
		}
	} catch (error) {
		console.log("An error occurred:", error);
	}
}

function LoginPage() {
	const handleNavigateToRegisterForm = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const navigate = useNavigate();
		navigate("registerPage");
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const email = form.email.value;
		const password = form.password.value;

		loginUser(email, password);
	};

	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input id="email" name="email" type="text" />
				</FormControl>

				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input id="password" name="password" type="password" />
				</FormControl>
				<Button type="submit">Log In</Button>
			</form>
		</>
	);
}

export default LoginPage;
