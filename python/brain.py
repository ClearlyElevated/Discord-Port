import discord
from discord.utils import get
from pprint import pprint
import json
import pathlib
from pathlib import Path
from discord import User
from discord.ext import commands
from discord.ext.commands import Bot
import commands

descrip = "A discord port to a webpage/machine written by NotU. Check out my Github!"
client = Bot(command_prefix = "-", description=descrip)

# Extracting the bot Token
jfile_path = Path("portJson.JSON").resolve()
with open(jfile_path, encoding='utf-8-sig') as jPort:
	rawFile = json.load(jPort)
	TOKEN = rawFile["TOKEN"]
# Extracting the taken Names
jname_path = Path("takenNames.JSON").resolve()
with open(jname_path, encoding='utf-8-sig') as jName:
	rawName = json.load(jName)

@client.event
async def on_ready():
	print("Port is online!")
	cmdName()
	if cmdName: # This executes if cmdName has a value.
		cmdCommand()
		if cmdName in rawName: # if cmdName is a takenName
			cmdName()
		else:
			cmdGuild()
			for guild in client.guilds:
				if cmdGuild == guild.name:
					print("Now chatting in ["+cmdGuild+"]")
					for channel in guild.channels:
						print(channel)
					cmdChannel()
					for channel in guild.channels:
						if channel.name == cmdChannel:
							cmdMessage()
							botMessage()
							await channel.send(botMessage)
							cmdCommand = input("Command: ")
							if
							# print message history here
							cmdMessage()
							botMessage()
											
client.run(TOKEN)