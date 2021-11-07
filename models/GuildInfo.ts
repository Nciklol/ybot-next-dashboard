import * as mongoose from "mongoose";

interface GuildInfo {
  serverID: string;
  muteRole: string;
  eco: number;
  gambling: number;
  welcomeEnabled: number;
  welcomeChannel: string;
  leavesEnabled: number;
  leavesChannel: string;
  delMsgEnabled: number;
  delMsgChannel: string;
  editMsgEnabled: number;
  editMsgChannel: string;
  setupRan: boolean;
  prefix: string;
  voiceParentId: string;
  voiceChannelId: string;
}

const guildSchema = new mongoose.Schema({
  serverID: {
    type: String,
    unique: true,
  },
  muteRole: String,
  eco: Number,
  gambling: Number,
  welcomeEnabled: Number,
  welcomeChannel: String,
  leavesEnabled: Number,
  leavesChannel: String,
  delMsgEnabled: Number,
  delMsgChannel: String,
  editMsgEnabled: Number,
  editMsgChannel: String,
  setupRan: Boolean,
  prefix: String,
  voiceParentId: String,
  voiceChannelId: String,
});

export default mongoose.models.Guild ||
  mongoose.model<GuildInfo>("Guild", guildSchema);
