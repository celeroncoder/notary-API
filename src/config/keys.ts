import * as dotenv from "dotenv";

dotenv.config();

const keys = {
	mongoURI: `mongodb+srv://admin:${process.env.MONGO_ADMIN_PASSWORD}@notjust.nedmi.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
};

export default keys;
