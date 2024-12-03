"use client";

import React, { useState } from "react";
import updateCustomer from "@/app/lib/updateCustomer";
import loginFunction from "@/app/lib/forgotPasswordFetcher";
import PasswordModal from "@/app/components/admin/PasswordModal";
import { SfButton, SfInput, SfSelect, SfSwitch } from "@storefront-ui/react";
import matchPassword from "@/app/lib/matchPassword";
import ConfirmationModal from "@/app/components/admin/ConfirmationModal";

export default function ModifyCustomer({ customerData }) {
  const [firstName, setFirstName] = useState(customerData?.firstName || "");
  const [lastName, setLastName] = useState(customerData?.lastName || "");
  const [address, setAddress] = useState(customerData?.address || "");
  const [postalCode, setPostalCode] = useState(customerData?.postalCode || "");
  const [telephone, setTelephone] = useState(customerData?.telephone || "");
  const [email, setEmail] = useState(customerData?.email || "");
  const [newsletter, setNewsletter] = useState(customerData?.newsletter || false);
  const [role, setRole] = useState(customerData?.role || "user");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false); 
  const [isSendingReset, setIsSendingReset] = useState(false); 
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState(role); 
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const forgotPassword = async () => {
    setIsSendingReset(true); 
    try {
      const result = await loginFunction({ email });
      if (result.success) {
        alert(
          `If a user with the email ${email} exists, a reset password link has been sent.`
        );
      } else {
        alert("Failed to send reset password link. Please try again.");
      }
    } catch (error) {
      console.error("Error sending reset password link:", error);
      alert("An error occurred while sending the reset password link.");
    } finally {
      setIsSendingReset(false); // Reset submission complete
    }
  };
  const handleRoleChange = (newRole) => {
    if (newRole !== role) {
      setPendingRole(newRole); // Set the role to be applied after confirmation
      setIsPasswordModalOpen(true); // Open password modal
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

  const getChangesSummary = () => {
    const changes = [];
    if (firstName !== customerData.firstName) changes.push(`First Name: ${customerData.firstName} → ${firstName}`);
    if (lastName !== customerData.lastName) changes.push(`Last Name: ${customerData.lastName} → ${lastName}`);
    if (address !== customerData.address) changes.push(`Address: ${customerData.address} → ${address}`);
    if (postalCode !== customerData.postalCode) changes.push(`Postal Code: ${customerData.postalCode} → ${postalCode}`);
    if (telephone !== customerData.telephone) changes.push(`Telephone: ${customerData.telephone} → ${telephone}`);
    if (email !== customerData.email) changes.push(`Email: ${customerData.email} → ${email}`);
    if (newsletter !== customerData.newsletter) changes.push(`Newsletter Subscription: ${customerData.newsletter ? "Yes" : "No"} → ${newsletter ? "Yes" : "No"}`);
    if (role !== customerData.role) changes.push(`Role: ${customerData.role} → ${role}`);
  
    return changes.length > 0 ? (
      changes.map((change, index) => (
        <React.Fragment key={index}>
          {change}
          <br />
        </React.Fragment>
      ))
    ) : (
      "No changes made."
    );
  };
  

 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirmationModalOpen(true); // Show confirmation modal before submitting
  };

  const handleConfirmSubmission = async () => {
    setIsConfirmationModalOpen(false);

    const updatedCustomer = {
      firstName,
      lastName,
      telephone: Number(telephone) || null,
      postalCode: Number(postalCode) || null,
      email,
      newsletter,
      role,
      address: address || null,
    };

    setIsSubmittingForm(true);
    try {
      const result = await updateCustomer(customerData, updatedCustomer);
      if (result.success) {
        alert("Customer updated successfully!");
      } else {
        alert(`Failed to update customer: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      alert(`Error updating customer: ${error.message}`);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 typography-headline-4 font-bold">Modify Customer</h1>
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
            type="number"
          />
        </div>

        {/* Telephone */}
        <div>
          <SfInput
            label="Telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
            placeholder="Enter telephone number"
            type="number"
          />
        </div>

        {/* Email */}
        <div>
          <SfInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
            type="email"
          />
        </div>

        {/* Newsletter */}
        <div className="flex items-center gap-4">
          <label>Subscribe to Newsletter</label>
          <SfSwitch
            checked={newsletter}
            onChange={() => setNewsletter((prev) => !prev)}
          />
        </div>

        {/* Forgot Password */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <SfButton
            type="button"
            className={`w-1/3 py-4 text-lg font-bold rounded-md ${
              isSendingReset || !email
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={forgotPassword}
            disabled={!email || isSendingReset} // Disable button if email is empty or already sending
          >
            {isSendingReset ? "Sending..." : "Send Reset Password Link"}
          </SfButton>
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
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <SfButton
            type="submit"
            className={`w-1/3 py-4 text-lg font-bold rounded-md ${
              isSubmittingForm ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
            disabled={isSubmittingForm} // Disable submit button during form submission
          >
            {isSubmittingForm ? "Submitting..." : "Update Customer"}
          </SfButton>
        </div>
      </form>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmSubmission}
        message={
          <>
            Changes: <br />
            <strong>{getChangesSummary()}</strong>
          </>
        }
      />
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
        message="Please confirm your password to change the role."
      />
    </div>
  );
}
