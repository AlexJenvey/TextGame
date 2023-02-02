class Room {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
        this._item = "";
        this._hasCollectedItem = false
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get character() {
        return this._character
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("description is too short.");
            return;
        }
        this._description = value;
    }

    set character(value) {
        this._character = value;
    }
    set item(value) {
        this._item = value
    }

    /**
     * a method to produce friendly room description
     * 
     * @returns {string} description of the room
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
        return "Looking around the " + this._name + " you can see " + this._description;
    }

    /**
    * a method to add rooms to link rooms to this one
    * it does this by adding them to _linkedRooms
    * 
    * @param {string} direction the direction the other rooom is from this one
    * @param {object} roomToLink the room that is in that direction
    * @author Neil Bizzell
    * @version 1.0
    */
    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;

    }



    /**
     * a method to produce friendly description of linked rooms
     * 
     * @returns {array} descriptions of what rooms are in which direction
     * @author Neil Bizzell
     * @version 1.0
     */
    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
            let text = " The " + room._name + " is to the " + direction;
            details.push(text);
        }
        return details;
    }

    /**
     * a method to move the adventurer to a new room
     * 
     * @param {string} direction the direction in which to move
     * @returns {object} the room moved to 
     * @author Neil Bizzell
     * @version 1.1
     */
    //method to move to a new room
    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way",);
            alert(this._name)
            return this;
        }
    }
}

class Item {
    constructor(name) {
        this._name = name,
            this._description = ""

    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._description = value;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    /**
     * a method to produce friendly item description
     * 
     * @returns {string} description of the item
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
        return "The " + this._name + " is " + this._description;
    }


}

class Character {
    constructor(name) {
        this._name = name,
            this._description = ""
        this._conversation = ""
    }
    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._description = value;
    }

    set conversation(value) {
        if (value.length < 4) {
            alert("conversation is too short.");
            return;
        }
        this._conversation = value;
    }
    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get conversation() {
        return this._conversation;
    }
    /**
     * a method to produce friendly character description
     * 
     * @returns {string} description of the character
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
        return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }

    /**
     * a method to produce friendly conversation text
     * 
     * @returns {string} the conversation text
     * @author Neil Bizzell
     * @version 1.0
     */
    converse() {
        return this._name + " says " + "'" + this._conversation + "'";
    }
}

//create the indiviual room objects and add their descriptions
const Kitchen = new Room("Kitchen");
Kitchen.description = "a long narrow room with worktops on either side and a large bench in the middle, A closed door with a lock is to the north of the room maybe you should find something to unlock it?";

const Lounge = new Room("Lounge");
Lounge.description = "a large room with two sofas and a large fire place";
const Key = new Item("Key")
Key.description = "A lone key sits on a table next to the closest sofa to you"
Lounge.item = Key
const GamesRoom = new Room("Games Room");
GamesRoom.description = "a large room with a pool table at it's centre";
const Cue = new Item("Cue");
Cue.description = "A pool cue rests on the side of the pool table"
GamesRoom.item = Cue
const Hall = new Room("Hall");
Hall.description = "a grand entrance hall with large paintings around the walls";
const Sword = new Item("Sword")
Sword.description = "A sharp shiny sword is displayed on a plaque mounted to the wall. It could be useful, do you want to take it?"
Hall.item = Sword
const Basement = new Room("Basement")
Basement.description = "A dark dingy basement you can see a large ominious figure lurking at the end of it"


//link the rooms together
Kitchen.linkRoom("south", Lounge);
Kitchen.linkRoom("east", Hall);
Kitchen.linkRoom("north", Basement);
Lounge.linkRoom("north", Kitchen);
Lounge.linkRoom("east", GamesRoom);
GamesRoom.linkRoom("west", Lounge);
GamesRoom.linkRoom("north", Hall);
Hall.linkRoom("south", GamesRoom);
Hall.linkRoom("west", Kitchen);


/**
 * Subroutine to display information about the current room
 * 
 * @param {object} room the room to be displayed
 * @author Neil Bizzell
 * @version 1.0 
 */
function displayRoomInfo(room) {
    let occupantMsg = ""
    let item = ""
    if (room.character === "") {
        occupantMsg = ""
    } else {
        occupantMsg = room.character.describe() + ". " + room.character.converse()
    }
    if (room._item !== "") {
        item = room._item
    }
    if (room._name === "Lounge" || room._name === "Hall") {
        room._hasCollectedItem = true
    }
    else if (room._name === "Basement" && Lounge._hasCollectedItem && Hall._hasCollectedItem) {
        alert("You have killed the monster, you win!")
        textContent = "<p>" + room.describe() + "</p>" + "<p>" +
        occupantMsg + "</p>" + "<p>" + room.getDetails() + "<p>" + item?._description + "</p>";

    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
        
    }
   else if (room._name === "Basement" && Lounge._hasCollectedItem) {
        alert("The monster overwhelms you, you lose!")
    }
    else if (room._name === "Basement" && Hall._hasCollectedItem) {
        alert("A key might fit in this lock, try find one?")
        room = Kitchen
    }
   else if (room._name === "Basement" && !Lounge._hasCollectedItem && !Hall._hasCollectedItem) {
        alert("A key might fit in this lock, try find one?")
        room = Kitchen
    }

    console.log(room)
    console.log(item)

    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
        occupantMsg + "</p>" + "<p>" + room.getDetails() + "<p>" + item?._description + "</p>";

    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
    
}

/**
 * Subroutine to complete inital game set up then handle commands from the user
 * 
 * @author Neil Bizzell
 * @version 1.0
 */
function startGame() {
    //set and display start room
    currentRoom = Kitchen
    console.log(currentRoom)
    displayRoomInfo(currentRoom);

    //

    //handle commands
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("usertext").value;
            const directions = ["north", "south", "east", "west"]
            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command)
                displayRoomInfo(currentRoom);
            } else {
                document.getElementById("usertext").value = ""
                alert("that is not a valid command please try again")
            }

        }
    });
}
startGame();