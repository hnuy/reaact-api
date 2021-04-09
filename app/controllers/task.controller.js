var MongoClient = require("mongodb").MongoClient;
const _ = require("lodash");
var url = "mongodb+srv://hnuy:0852365805@cluster1.k4i4w.mongodb.net/";

exports.addTask = async (req, res) => {
  MongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    const dbo = db.db("test");
    //const where = { name: "hnuy" };
    //{ projection: { _id: 0 } } ---> cut field
    //{ address: /^S/ } ---> use the regular expression start S
    const insertTask = {
      title: req.body.title,
      description: req.body.description,
      file: req.body.file,
      checkList: req.body.checkList,
      date: req.body.date,
    };
    try {
      const result = await dbo.collection("task").insertOne(insertTask);
      res.status(200).send(result.ops);
      db.close();
    } catch (error) {
      throw error;
    }
  });
};
