# ChemStore Files API

1. [Category](http://chemstore2.azurewebsites.net/api/filemanager/categories/)
2. [File](http://chemstore2.azurewebsites.net/api/filemanager/files/)

## File Create

URL: [http://chemstore2.azurewebsites.net/api/filemanager/files/](http://chemstore2.azurewebsites.net/api/filemanager/files/) 

Method: POST

Body: 

```json
{
    "categories": [
        1,
        2
    ],
    "chemicals": [
        1,
        2
    ],
    "file": "File Binary Data"
}
```

Response:

```json
{
    "id": 1,
    "categories": [
        1,
        2
    ],
    "chemicals": [
        1,
        2
    ],
    "file": "http://localhost:8000/media/files/aaa.pdf"
}
```

## File Update

URL: [http://chemstore2.azurewebsites.net/api/filemanager/files/<id>/](http://chemstore2.azurewebsites.net/api/filemanager/files/1/)

Method: PATCH

Body:

```json
{
    "categories": [
        1,
        2
    ]
}
```
or
```json
{
    "chemicals": [
        1,
        2
    ]
}
```

Response:

```json
{
    "id": 1,
    "categories": [
        1,
        2
    ],
    "chemicals": [
        1,
        2
    ],
    "file": "http://localhost:8000/media/files/aaa.pdf"
}
```

## File Delete

URL: [http://chemstore2.azurewebsites.net/api/filemanager/files/<id>/](http://chemstore2.azurewebsites.net/api/filemanager/files/1/)

Method: DELETE