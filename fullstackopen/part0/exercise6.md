sequenceDiagram
    participant browser
    participant server
    participant user

    user->>browser: Types something and clicks "Save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Response 201 Created, message: "note created".
    deactivate server

    Note right of browser: The browser updates the UI without reloading
    Note right of browser: The new note appears immediately on the page
