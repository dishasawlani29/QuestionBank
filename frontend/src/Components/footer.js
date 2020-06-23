import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div class="bodybgcolor">
        <section class="footer-section bg-lightgrey" id="foot-sec">
          <div class="contai">
            <div class="footer text-center">
              <div>
                <div class="row mb-5">
                  <div class="col-12">
                    <p
                      class="mb-0"
                      id="socialmedia1"
                      //   style="overflow-y: hidden;padding-top: 40px;"
                      style={{ paddingTop: "40px" }}
                    >
                      <a
                        href="https://www.facebook.com/caramelacademy/"
                        class="p-2"
                      >
                        <span
                          class="fa fa-facebook-square"
                          //   style="font-size:36px;color: #292C7D;"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                      <a href="https://twitter.com/caramelacademy" class="p-2">
                        <span
                          class="fa fa-twitter-square"
                          //   style="font-size:36px;color: #292C7D"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                      <a
                        href="https://www.instagram.com/caramelitacademy/"
                        class="p-2"
                      >
                        <span
                          class="fa fa-instagram"
                          //   style="font-size:36px;color: #292C7D"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/37846486/admin/"
                        class="p-2"
                      >
                        <span
                          class="fa fa-linkedin-square"
                          //   style="font-size:36px;color: #292C7D"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                      <a
                        href="https://in.pinterest.com/caramelacademy/"
                        class="p-2"
                      >
                        <span
                          class="fa fa-pinterest-square"
                          //   style="font-size:36px;color: #292C7D"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                      <a
                        href="https://api.whatsapp.com/send?phone=+918886660462&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202."
                        class="p-2"
                      >
                        <span
                          class="fa fa-whatsapp"
                          //   style="font-size:36px;color: #292C7D"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <p class="mb-0" id="foter" style={{ fontSize: "18px" }}>
                      Copyright &copy;
                      <script>
                        document.write(new Date().getFullYear());
                      </script>{" "}
                      All rights reserved By Caramel IT Services Pvt.Ltd.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
