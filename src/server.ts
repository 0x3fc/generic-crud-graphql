import { serve } from "./bootstrap/app";
import { connectDb } from "./bootstrap/database";
import "./bootstrap/loadUtils";

serve();
connectDb();
