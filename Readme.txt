 Question Bank 

1. After downloading the files.Open them in VS code.

2. Run "npm install" command on terminals of both frontend and backend to add node modules folder to the folder.

3. Run"nodemon server" command on th terminal of backend folder to get the server running.

4. Run"npm install" command on th terminal of frontend folder to start the dovelopment server.

5. The database is connected to the Mongo Atlas using the following code in server.js

mongoose.connect(
  "mongodb+srv://caramel_it:Admin123%23@projectz-gjuxk.mongodb.net/Caramel_Model?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

6. To make the database local,replace the above code with:

mongoose.connect("mongodb://127.0.0.1:27017/questions", {
  useNewUrlParser: true,
});