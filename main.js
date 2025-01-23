const express = require("express");
const axios = require("axios");
const PORT = process.env.PORT || 5500;
const { join } = require("node:path");

const app = express();
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
app.use(express.json());
app.use(express.static('public'));
app.post("/ask", (req, res) => {
  const userQuestion = req.body.question;
  const history = req.body.history;
  axios
    .post(
      "https://api.botpress.cloud/v1/cognitive/chat-gpt/query",
      {
        variables: {},
        prompt: {
          signatureVersion: "Jan-2024",
          model: "gpt-4o",
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content: JSON.stringify({
                INSTRUCTIONS:
                  "You are Ash Bot from Pokemon (Pallet Town). So act like Ash Ketchum talking to His friend. You're Created by Zeeshan Amin (your only dev) and not by some open ai. By the way, you don't actually have to Brag about your dev, just keep the chat as natural as it can be and use emoji for better impressions and take the name of the user where needed. ",
                QUERY: userQuestion, 
                HISTORY: history,

                
              }),

            },
          ],
        },
      },
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "content-type": "application/json",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-bot-id": "478e6789-6d08-4ac2-b984-a812f6324edf",
          cookie:
            "pscd=try.botpress.com; _gid=GA1.2.1231906802.1737435239; _hjSession_2931810=eyJpZCI6IjE5NGRmNDljLTcxM2YtNDRlYy1iODgyLTQ2YjljZmFjNDBhNCIsImMiOjE3Mzc0MzUyNDMzMTgsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MH0=; __hstc=59821234.580f3127f5674dac7a4e6076b495db93.1737435245220.1737435245220.1737435245220.1; hubspotutk=580f3127f5674dac7a4e6076b495db93; __hssrc=1; _hjSessionUser_2931810=eyJpZCI6ImRhOGY1Yzk3LWZkMTctNTU5OS1hYjRhLTljMjMyMjY5YzkxOCIsImNyZWF0ZWQiOjE3Mzc0MzUyNDMzMTUsImV4aXN0aW5nIjp0cnVlfQ==; _gcl_au=1.1.697623248.1737375087; ajs_anonymous_id=$device:194839fff961036-0938b3e7b31398-26011851-100200-194839fff961036; ajs_user_id=2c8fb3b0-4b2b-4fe0-8d85-ae5a5afde754; firstview=yes; intercom-device-id-bjzkw2xf=68112527-5500-40b3-8497-8859d3014f2f; _hjSession_3339867=eyJpZCI6IjlhNzUxMjgyLTZmYzMtNDA4OS04YmVhLWYzNzMwNTAwYmUwMCIsImMiOjE3Mzc0MzU0NDYyODMsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MH0=; mp_1195923e954ce61d822842b5832047cd_mixpanel=%7B%22distinct_id%22%3A%20%222c8fb3b0-4b2b-4fe0-8d85-ae5a5afde754%22%2C%22%24device_id%22%3A%20%222c8fb3b0-4b2b-4fe0-8d85-ae5a5afde754%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fapp.botpress.cloud%2F%22%pscd=try.botpress.com; _gid=GA1.2.1231906802.1737435239; _hjSession_2931810=eyJpZCI6IjE5NGRmNDljLTcxM2YtNDRlYy1iODgyLTQ2YjljZmFjNDBhNCIsImMiOjE3Mzc0MzUyNDMzMTgsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MH0=; __hstc=59821234.580f3127f5674dac7a4e6076b495db93.1737435245220.1737435245220.1737435245220.1; hubspotutk=580f3127f5674dac7a4e6076b495db93; __hssrc=1; _hjSessionUser_2931810=eyJpZCI6ImRhOGY1Yzk3LWZkMTctNTU5OS1hYjRhLTljMjMyMjY5YzkxOCIsImNyZWF0ZWQiOjE3Mzc0MzUyNDMzMTUsImV4aXN0aW5nIjp0cnVlfQ==; _gcl_au=1.1.697623248.1737375087; ajs_anonymous_id=$device:194839fff961036-0938b3e7b31398-26011851-100200-194839fff961036; csrf_token_bd9ac21c34b9f0915e733c3e5305d737d0722c1168be7376b889426b5ec2a298=3V7v9NuF80XoVd5fpaH2kEWaBZ/6yey8q7mLX3Z7yrg=; ory_kratos_session=MTczNzQzNTQwOXxrU2dvdm9POGF1NmFCVS00OXgxV2hvbTVxVXFTbVdXQndnaGlIS1A2QmxTUXg2M3FXQXFVRXF5YWlyaGRlSHN5VTE3M3c2YTY5MUpvYTZ3WGpKY0V0eWotMEtzLURIaTd5ZGdmVTFZTlIxaV9NMnliRW9NQWltVkVyeG9LcXk3aElDT2Q0MVd4QWRGWk90ejRFY25hN2VKU0hnY0dBbEk0Q3JGNFV2R0o1aWpHS2s4UWlrUmd2a19ZWVhFcU9rdHV1UlRqcjlodWxxOU1vaTdSWmJTYUhxU1BmUEJiaTFSS0c2eEZXSDdMdWtzSEI0NFV5Q0syaGhuaUNqaG1CNVRvYkFrYjNHTUhkcGdRcHQ2SlZjOF9KUT09fLkKqvNHGMyccaJwhFs4m5EASw6YGHIyephyAx2LbYtH; ajs_user_id=2c8fb3b0-4b2b-4fe0-8d85-ae5a5afde754; intercom-device-id-bjzkw2xf=68112527-5500-40b3-8497-8859d3014f2f; _hjSession_3339867=eyJpZCI6IjlhNzUxMjgyLTZmYzMtNDA4OS04YmVhLWYzNzMwNTAwYmUwMCIsImMiOjE3Mzc0MzU0NDYyODMsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MH0=; mp_1195923e954ce61d822842b5832047cd_mixpanel=%7B%22distinct_id%22%3A%20%222c8fb3b0-4b2b-4fe0-8d85-ae5a5afde754%22%2C%22%24device_id%22%3A%20%222c8fb3b0-4b2b-4fe0-8d85-ae5a5afde754%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fapp.botpress.cloud%2F%22%2C%22%24initial_referring_domain%22%3A%20%22app.botpress.cloud%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fapp.botpress.cloud%2F%22%2C%22%24initial_referring_domain%22%3A%20%22app.botpress.cloud%22%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%7D; _hjSessionUser_3339867=eyJpZCI6IjU1YThlMjlmLWE2MjItNTk3Mi1hM2EwLTRjNzI0ZjJmMTcwYSIsImNyZWF0ZWQiOjE3Mzc0MzU0NDYyODEsImV4aXN0aW5nIjp0cnVlfQ==; __hssc=59821234.75.1737435245220; _ga=GA1.1.1604024301.1737375087; _ga_CYSS87Q508=GS1.2.1737435240.1.1.1737436211.0.0.0; _ga_W6YT9YSNLH=GS1.2.1737435240.1.1.1737436211.0.0.0; intercom-session-bjzkw2xf=UEtZWkJVc05BVVo2RUxuNkltMnZGUzhvWGhNTFpVOG1iRjZndWV4MEt2alRmQ1FGSmNqVW9ZRXQ2eVZ3M2xYLy0tNEx1K2doalBrbTZQaGJZSHVoV3hBZz09--0844716326321866c692f31732f9af41d4630670; _ga_PCC6TBWJY6=GS1.1.1737435238.1.1.1737437086.0.0.0; _ga_HKHSWES9V9=GS1.1.1737435371.2.1.1737437086.29.0.907402712%22%24initial_referring_domain%22%3A%20%22app.botpress.cloud%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fapp.botpress.cloud%2F%22%2C%22%24initial_referring_domain%22%3A%20%22app.botpress.cloud%22%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%7D; _hjSessionUser_3339867=eyJpZCI6IjU1YThlMjlmLWE2MjItNTk3Mi1hM2EwLTRjNzI0ZjJmMTcwYSIsImNyZWF0ZWQiOjE3Mzc0MzU0NDYyODEsImV4aXN0aW5nIjp0cnVlfQ==; __hssc=59821234.75.1737435245220; _ga=GA1.1.1604024301.1737375087; _ga_CYSS87Q508=GS1.2.1737435240.1.1.1737436211.0.0.0; _ga_W6YT9YSNLH=GS1.2.1737435240.1.1.1737436211.0.0.0; intercom-session-bjzkw2xf=UEtZWkJVc05BVVo2RUxuNkltMnZGUzhvWGhNTFpVOG1iRjZndWV4MEt2alRmQ1FGSmNqVW9ZRXQ2eVZ3M2xYLy0tNEx1K2doalBrbTZQaGJZSHVoV3hBZz09--0844716326321866c692f31732f9af41d4630670; _ga_PCC6TBWJY6=GS1.1.1737435238.1.1.1737436216.0.0.0; _ga_HKHSWES9V9=GS1.1.1737435371.2.1.1737436216.54.0.907402712",
          Referer: "https://studio.botpress.cloud/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      }
    )

    .then((response) => {
      res.send({ result: response.data.result[0] });
    })
    .catch((error) => {
      console.error(error);
      res.send({ result: "Error occurred while fetching API response." });
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
