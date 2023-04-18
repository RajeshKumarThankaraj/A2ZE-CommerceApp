import React from "react";
import Login from "./login";

const signup = () => {
  return (
    <div>
      <div class="vh-100 bg-info d-flex flex-row justify-content-end align-items-center">
        <div class="split leftContainer"></div>
        <div class="split rightContainer d-flex align-items-center flex-column">
          <div class="signUpContent d-flex align-items-center">
            <i>Looks like you are new here!</i>
          </div>
          <form class="d-flex flex-column justify-content-center align-items-center">
            <div class="formContainer">
              <div class="mb-3">
                <h3 class="d-flex justify-content-flex-start">
                  Create an Account
                </h3>
              </div>
              <div class="mb-3">
                <label for="signUpEmail" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="signUpEmail"
                  placeholder="abc@example.com"
                />
              </div>
              <div class="mb-3">
                <label for="signUpPhone" class="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  class="form-control"
                  id="signUpPhone"
                  placeholder="+91 **********"
                />
              </div>
              <div class="mb-3">
                <label for="signUpPassword" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="signUpPassword"
                  placeholder="*****"
                />
              </div>
              <button type="submit" class="btn">
                Sign up
              </button>
              <div class="mt-5 d-flex justify-content-start">
                <label for="signUpWith" class="form-label me-3">
                  Or sign up with
                </label>
                <div class="d-flex justify-content-flex-end">
                  <i class="bi bi-facebook mx-3"></i>
                  <i class="bi bi-google mx-3"></i>
                </div>
              </div>
              <div class="mt-3 d-flex justify-content-center align-items-center">
                <label for="loginAccount" class="form-label createAccount">
                  Existing User? <Login>Login</Login>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signup;
