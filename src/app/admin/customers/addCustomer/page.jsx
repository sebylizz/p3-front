"use client";
import React from "react";
import addCustomerAdmin from "@/app/lib/addCustomerAdmin";
import validatePassword from "@/app/lib/passwordChecker";
import ConfirmationModal from "@/app/components/admin/ConfirmationModal";
import PasswordModal from "@/app/components/admin/PasswordModal";
import matchPassword from "@/app/lib/matchPassword";

import { useState } from "react";
import {
  SfButton,
  SfInput,
  SfSelect,
  SfSwitch,
  SfCheckbox,
  SfListItem,
  SfModal,
} from "@storefront-ui/react";

export default function addCustomer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState("user");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value || null; // Allow null for unchanged passwords
    setPassword(newPassword);

    if (newPassword) {
      const { isValid, errors } = validatePassword(newPassword);
      setPasswordErrors(errors);
    } else {
      // Clear errors if password is null (not changed)
      setPasswordErrors([]);
    }
  };

  const handleRoleChange = (newRole) => {
    if (newRole === "admin" && role !== "admin") {
      setPendingRole(newRole);
      setIsPasswordModalOpen(true);
    } else {
      setRole(newRole);
    }
  };

  const handlePasswordConfirm = async (password) => {
    setIsPasswordModalOpen(false); // Close the modal

    try {
      const isPasswordValid = await matchPassword(password); // Pass the entered password
      if (isPasswordValid) {
        setRole(pendingRole); // Apply the pending role if the password is valid
        alert("Password confirmed. Role changed successfully.");
      } else {
        alert("Password is incorrect. Role change aborted.");
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      alert("An error occurred while verifying the password.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordErrors.length > 0) {
      alert("Password does not meet security requirements.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsConfirmationModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setIsConfirmationModalOpen(false);
    setIsSubmitting(true);

    const customerData = {
      firstName,
      lastName,
      email,
      telephone,
      address,
      postalCode,
      password,
      role,
    };

    try {
      const response = await addCustomerAdmin(customerData);

      alert(response.message || "Customer added successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setTelephone("");
      setAddress("");
      setPostalCode("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");
    } catch (error) {
      console.error("Error adding customer:", error);
      alert(`Error adding customer: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 typography-headline-4 font-bold">Add Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name */}
        <div>
          <SfInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name */}
        <div>
          <SfInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter last name"
          />
        </div>

        {/* Email */}
        <div>
          <SfInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </div>

        {/* Telephone */}
        <div>
          <SfInput
            label="Telephone"
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
            placeholder="Enter telephone number"
          />
        </div>

        {/* Address */}
        <div>
          <SfInput
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter address"
          />
        </div>

        {/* Postal Code */}
        <div>
          <SfInput
            label="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            placeholder="Enter postal code"
          />
        </div>

        {/* Password */}
        <div>
          <SfInput
            label="Password"
            type="password"
            value={password || ""} // Ensure the value is always a string
            onChange={handlePasswordChange}
            required
            placeholder="Enter password"
          />

          {/* Error Messages */}
          <div className="mt-2">
            {passwordErrors.length > 0 && (
              <ul className="text-red-500 text-sm">
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Confirm Password */}
          <SfInput
            label="Confirm Password"
            type="password"
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm password"
          />
          {/* Error Messages */}
          {password === "" && confirmPassword != "" && (
            <p className="text-red-500 text-sm">Enter password first!</p>
          )}
          <div className="mt-2">
            {password != confirmPassword && confirmPassword != "" > 0 && (
              <p className="text-red-500 text-sm">
                The passwords do not match!
              </p>
            )}
          </div>
        </div>

        {/* Role */}
        <div>
          <SfSelect
            label="Role"
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </SfSelect>
        </div>

        {/* Submit Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <SfButton
            type="submit"
            disabled={(passwordErrors?.length > 0 && password) || isSubmitting}
            className={`w-1/3 py-4 text-lg font-bold ${
              isSubmitting || (passwordErrors?.length > 0 && password)
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            } rounded-md`}
          >
            {isSubmitting ? "Submitting..." : "Add Customer"}
          </SfButton>
        </div>
      </form>
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
        message="Please confirm your password to change the role to admin."
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        message="Are you sure you want to submit the form?"
      />
    </div>
  );
}
