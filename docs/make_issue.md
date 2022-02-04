# Add Shipment
**Link:** [Add Shipment](http://chemstore.azurewebsites.net/api/management/make-issue/) 

**Body:**
```json
{
    "issue_date": "2022-2-4",
    "note": "This is a nice Issue",
    "consumer_id": 1,
    "objects": [
        {
            "id": 1,
            "material_type": "CHEMICAL",
            "amount": 1
        },
        {
            "id": 1,
            "material_type": "GLASSWARE",
            "amount": 2
        }
    ]
}
```

**Response:**
```json
{
    "errors": [],
    "message": "Issue Created"
}
```

