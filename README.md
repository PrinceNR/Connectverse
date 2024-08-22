Connectverse is a Node.js-based API designed for a social media platform. 
This API handles various administrative tasks such as admin creation, login, OTP verification via email, image uploading using Multer, and logout functionality. 
The API uses MongoDB as its database for storing data and includes an .env file for easy configuration.

step 1 : clone the repository
step 2 : install node package manager (npm i)
step 3 : You are ready to check the functionality of this api using thunderclient or postman or any other tool like this.. 

api : http://localhost:5010/admin/

API- End points  :

1 Router : /signup(post)  :  Create a new admin by providing their details.

                             Request Body: (sample format)
                             
                                      {
                                        "name": "adminName",
                                        "email": "adminemail@gmail.com",
                                        "password": "admin"
                                      }
                                      
                              Response( if it success) :{   "message": "Otp sent successfully"  }
                              The OTP is logged in the console for verification purposes
                              
2 Router : /otp(post) :  Verify the OTP sent to the admin's email . 

                        Request Body: (sample format)
                        {  "otp": "785656" }
                        

3 Router : /image(post) (Optional) :  Upload an admin profile picture. The image is stored locally, and the filename is returned in the respons
                                    *This route is not fully implemented and is intended to be used with a frontend for complete functionality.

4 Router : /login(post) : Log in an admin using their email and password.

                         Request Body: (sample format)  {     "email": "adminemail@gmail.com",
                                                               "password": "admin" 
                                                        }
                         Response: If successful, a JWT token is generated and stored in cookies.
                         
5 Router : /logout(delete) :  Log out an admin by clearing the JWT token from the cookies.


Testing the API :

You can test the functionality of this API using tools like Thunder Client, Postman, or any other API testing tool.

