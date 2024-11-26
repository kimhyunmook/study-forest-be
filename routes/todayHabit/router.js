import express from "express";
import todayHabitRouter from "./todayHabit.js"; 

const app = express();
const PORT = 8000;

app.use(express.json()); 
app.use("/api", todayHabitRouter); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});