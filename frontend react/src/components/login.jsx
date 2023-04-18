import React from "react";
import Signup from "./signup";

const login = () => {
  return (
    <div>
      <div class="vh-100 bg-info d-flex flex-row justify-content-end align-items-center">
        <div class="split leftContainer"></div>
        <div class="split rightContainer">
          <form class="d-flex vh-100 flex-column justify-content-center align-items-center">
            <div class="formContainer">
              <div class="mb-3">
                <h3 class="d-flex justify-content-flex-start">Login</h3>
              </div>
              <div class="mb-3">
                <label for="loginEmail" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="loginEmail"
                  placeholder="abc@example.com"
                />
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="loginPassword"
                  placeholder="*****"
                />
              </div>
              <button type="submit" class="btn">
                Login
              </button>
              <div class="mt-5 d-flex justify-content-start">
                <label for="loginWith" class="form-label me-3">
                  Or login with
                </label>
                <div class="d-flex justify-content-flex-end">
                  <i class="bi bi-facebook mx-3"></i>
                  <i class="bi bi-google mx-3"></i>
                </div>
              </div>
              <div class="mt-3 d-flex justify-content-center align-items-center">
                <label for="createAccount" class="form-label createAccount">
                  <Signup>Create Account</Signup>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
