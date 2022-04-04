const Evacuation = require("../models/evacuation");
const Evacuees = require("../models/evacuees");
const moment = require("moment");

//dd pag add evacuees

//quary date
exports.test = async (req, res) => {
  console.log(req.query);
  const { date, _id, isMili } = req.query;

  res.render("evacuees", { date, _id, isMili });
};
exports.getEvacuees = async (req, res) => {
  console.log(req.query);
  const { date, _id, isMili } = req.query;
  let p = new Promise((resolve, reject) => {
    if (isMili === "true") {
      const today = moment(parseInt(date)).startOf("day");
      const end = moment(parseInt(date)).endOf("day");
      console.log(end);
      resolve([today, end]);
    } else if (isMili === "false") {
      console.log(moment(date).startOf("day"));
      const today = moment(date).startOf("day");
      const end = moment(date).endOf("day");
      resolve([today, end]);
    } else {
      reject(null);
    }
  });
  //console.log(moment(today).format());
  p.then(async ([today, end]) => {
    console.log(today, end, _id);
    const evacuees = await Evacuees.find({
      $and: [
        { evacuation: { $eq: _id } },
        {
          date: {
            $gte: moment(today).format(),
          },
        },
        {
          date: {
            $lte: moment(end).format(),
          },
        },
      ],
    });
    console.log(evacuees);
    res.send(evacuees);
  });
};

exports.addEvacuees = async (req, res) => {
  const { name, _id, date } = req.body;
  console.log(req.body);

  try {
    const evacuees = await new Evacuees({
      name,
      evacuation: _id,
      date: moment(parseInt(date)).format(),
    });
    await evacuees.save();
    res.send("ok");
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};
