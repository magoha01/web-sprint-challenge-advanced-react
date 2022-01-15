import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm />);
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm />);

    const firstName = screen.getByLabelText(/First Name:/);
    userEvent.type(firstName, "firstName");

    const lastName = screen.getByLabelText(/Last Name:/);
    userEvent.type(lastName, "lastName");

    const address = screen.getByLabelText(/Address:/);
    userEvent.type(address, "123 main st");

    const city = screen.getByLabelText(/City:/);
    userEvent.type(city, "City");

    const state = screen.getByLabelText(/State:/);
    userEvent.type(state, "State");

    const zip = screen.getByLabelText(/Zip:/);
    userEvent.type(zip, "12345");

    const checkOut = screen.getByRole("button");
    userEvent.click(checkOut);

    waitFor(async () => {
        const successMessage1 = screen.queryByText(/You have ordered some plants! Woo-hoo!/i);
        const successMessage2 = screen.queryByText(/Your new green friends will be shipped to:/i);

        expect(successMessage1).toBeInTheDocument();
         expect(successMessage1).toBeTruthy();
        expect(successMessage1).not.toBeNull();

        expect(successMessage2).toBeInTheDocument();
        expect(successMessage2).toBeTruthy();
        expect(successMessage2).not.toBeNull();

        const nameOutput = screen.queryByText("firstName lastName");
        const streetOutput = screen.queryByText("123 main st");
        const locationOutput = screen.queryByText('City, State 12345');
      

        expect(nameOutput).toBeInTheDocument();
        expect(nameOutput).toBeTruthy();
        expect(nameOutput).not.toBeNull();

        expect(streetOutput).toBeInTheDocument();
        expect(streetOutput).toBeTruthy();
        expect(streetOutput).not.toBeNull();

        expect(locationOutput).toBeInTheDocument();
        expect(locationOutput).toBeTruthy();
        expect(locationOutput).not.toBeNull();

    })

});
