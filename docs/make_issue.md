# Make Issue

1. [Add in Cart](http://chemstore2.azurewebsites.net/api/management/issue-cart/)
2. [Make Issue](http://chemstore2.azurewebsites.net/api/management/issue-cart/1/merge/)


## **Issues**
URL = /api/management/issues/<location_id>/

Link: [List of Issues](https://chemstore2.azurewebsites.net/api/management/issues/1/)

Method: GET

Response:
```json
   [
    {
        "id": 1,
        "created_at": "2022-04-04T09:16:38.430673Z",
        "objects": [
            {
                "id": 1,
                "name": "Chem1",
                "object_type": "CHEMICAL",
                "quantity": 5.0
            },
            {
                "id": 1,
                "name": "Glass1",
                "object_type": "GLASSWARE",
                "quantity": 5.0
            }
        ]
    }
]
```