# _REAL TIME MESSENGER_

_Real time messenging web app using [Stream](https://getstream.io/)._

## Setup

### Dependencies

- [stream-chat-react](https://www.npmjs.com/package/stream-chat-react)
- [styled-components](https://styled-components.com/)
- [universal-cookie](https://www.google.com/search?client=firefox-b-d&q=universal+cookie)

### Installation

**SERVER**

1. Download Server from [Here](https://github.com/jamesindeed/rt-messenger-server.git) or clone it using the command below.

```javascript
git clone https://github.com/jamesindeed/rt-messenger-server.git
```

2. Rename .env.example to .env and fill in your own info.
3. Run below to install packages

```javscript
npm i
```

4. Run below to start Server on localhost:5000.

```javscript
npm start
```

---

**CLIENT**

5. Clone server using command below.

```javascript
git clone https://github.com/jamesindeed/rt-messenger.git
```

6. Rename .env.example to .env and fill in your own info.
7. Run below to install packages

```javscript
npm i
```

8.  Run below to start Client on localhost:3000.

```javascript
npm start // Open http://localhost:3000 to view it in the browser.
```

## Usage

_To aquire all stream keys for the .env file. Sign up for an account [here](https://getstream.io/)._

## Demo

```javascript
const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (event) => {
    event.preventDefault();

    const nameChanged = channelName != (channel.data.name || channel.data.id);

    if (nameChanged) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );
    }
    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }
    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  };

```

## Errors and bugs

If something is not behaving intuitively, it is a bug and should be reported.
Report it here by creating an issue: https://github.com/jamesindeed/rt-messenger/issues

## Patches and pull requests

Your patches are welcome. Here's our suggested workflow:

- Fork the project.
- Make your feature addition or bug fix.
- Send us a pull request with a description of your work. Bonus points for topic branches!
