"use strict";
const axios = require("axios");
const url = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";

module.exports = {
  alljobs: async (req, res, next) => {
    try {
      const axiosResponse = await axios({
        method: "GET",
        url,
      });

      if (!axiosResponse)
        throw {
          name: "Error Axios",
          statusCode: 400,
          data: req.query,
        };

      const result = {
        meta: { statusCode: 200, message: `SUCCESS`, time: new Date() },
        data: axiosResponse.data,
      };
      res.status(200).json(result);
    } catch (e) {
      return next(e);
    }
  },

  jobssearch: async (req, res, next) => {
    try {
      const { description, lokasi, full_time, page_size, page_number } =
        req.query;

      if (!page_size || !page_number)
        throw {
          name: "Error page_size or page_number",
          statusCode: 400,
          data: req.query,
        };

      const filterData = {
        location: lokasi,
        type: full_time ? "Full Time" : "",
      };
      lokasi ? "" : delete filterData.location;
      full_time ? "" : delete filterData.type;

      const axiosResponse = await axios({
        method: "GET",
        url,
      });

      if (!axiosResponse)
        throw {
          name: "Error Axios",
          statusCode: 400,
          data: req.query,
        };

      let resultFilter = [];
      if (description && description !== "")
        axiosResponse.data.forEach((data) => {
          if (data.description.search(description)) {
            resultFilter.push(data);
          }
        });
      else resultFilter = axiosResponse.data;

      const dataJobFilter = resultFilter.filter(function (item) {
        for (var key in filterData) {
          if (item[key] === undefined || item[key] !== filterData[key])
            return false;
        }
        return true;
      });

      function paginate(array, page_size, page_number) {
        return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
      }

      const dataFinal =
        page_size && page_number
          ? paginate(dataJobFilter, page_size, page_number)
          : dataJobFilter;

      const result = {
        meta: { statusCode: 200, message: `SUCCESS`, time: new Date() },
        data: dataFinal,
      };
      res.status(200).json(result);
    } catch (e) {
      return next(e);
    }
  },

  jobdatabyid: async (req, res, next) => {
    try {
      const { id } = req.params;
      const axiosResponse = await axios({
        method: "GET",
        url,
      });
      if (!axiosResponse)
        throw {
          name: "Error Axios",
          statusCode: 400,
          data: id,
        };
      const dataAxiosFind = axiosResponse.data.find((data) => data.id === id);
      if (!dataAxiosFind)
        throw {
          name: "Error Data not Fount",
          statusCode: 400,
          data: id,
        };
      const result = {
        meta: { statusCode: 200, message: `SUCCESS`, time: new Date() },
        data: dataAxiosFind,
      };
      res.status(200).json(result);
    } catch (e) {
      return next(e);
    }
  },
};

// const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?${
//   description ? `description=${description}` : ""
// }${lokasi ? `${description ? "&" : ""}lokasi=${lokasi}` : ""}${
//   full_time ? `${lokasi ? "&" : ""}full_time=${full_time}` : ""
// }${page ? `${full_time ? "&" : ""}page=${page}` : ""}`;
