import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

export interface Player {
  id: string;
  timestamp: string;
  age: number;
  name: string;
  activity: string;
  playFrequency: string;
  timezone: string;
  premium: string;
  version: string;
  discord: string;
  minecraft: string;
  telegram: string;
}

interface PlayersTableProps {
  players: Player[];
}

type SortField = "age" | "playFrequency" | "timestamp";
type SortDirection = "asc" | "desc";

const PlayersTable: React.FC<PlayersTableProps> = ({ players }) => {
  const [sortField, setSortField] = useState<SortField>("timestamp");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case "age":
          aValue = parseFloat(a.age.toString()) || 0;
          bValue = parseFloat(b.age.toString()) || 0;
          break;
        case "playFrequency":
          const frequencyOrder = {
            "Часто играю": 3,
            "Средне играю": 2,
            "Редко играю": 1,
          };
          aValue =
            frequencyOrder[a.playFrequency as keyof typeof frequencyOrder] || 0;
          bValue =
            frequencyOrder[b.playFrequency as keyof typeof frequencyOrder] || 0;
          break;
        case "timestamp":
          aValue = new Date(a.timestamp).getTime();
          bValue = new Date(b.timestamp).getTime();
          break;
        default:
          aValue = 0;
          bValue = 0;
      }

      if (sortDirection === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }, [players, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={16} />;
    }
    return sortDirection === "asc" ? (
      <Icon name="ArrowUp" size={16} />
    ) : (
      <Icon name="ArrowDown" size={16} />
    );
  };

  const getFrequencyBadge = (frequency: string) => {
    const colors = {
      "Часто играю": "bg-green-600 hover:bg-green-700",
      "Средне играю": "bg-yellow-600 hover:bg-yellow-700",
      "Редко играю": "bg-red-600 hover:bg-red-700",
    };
    return colors[frequency as keyof typeof colors] || "bg-gray-600";
  };

  const getVersionBadge = (version: string) => {
    return version.includes("Java")
      ? "bg-orange-600 hover:bg-orange-700"
      : "bg-purple-600 hover:bg-purple-700";
  };

  return (
    <Card className="w-full minecraft-card">
      <CardHeader className="minecraft-header">
        <CardTitle className="text-2xl font-bold text-center minecraft-title flex items-center justify-center gap-2">
          <span className="text-2xl">⛏️</span>
          Список игроков Minecraft
          <span className="text-2xl">🎮</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full minecraft-table">
            <thead className="minecraft-thead">
              <tr>
                <th className="minecraft-th">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("timestamp")}
                    className="minecraft-sort-btn"
                  >
                    📅 Дата
                    {getSortIcon("timestamp")}
                  </Button>
                </th>
                <th className="minecraft-th">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("age")}
                    className="minecraft-sort-btn"
                  >
                    🎂 Возраст
                    {getSortIcon("age")}
                  </Button>
                </th>
                <th className="minecraft-th">👤 Имя</th>
                <th className="minecraft-th">🏗️ Активность</th>
                <th className="minecraft-th">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("playFrequency")}
                    className="minecraft-sort-btn"
                  >
                    ⚡ Частота игры
                    {getSortIcon("playFrequency")}
                  </Button>
                </th>
                <th className="minecraft-th">🌍 Часовой пояс</th>
                <th className="minecraft-th">💎 Премиум</th>
                <th className="minecraft-th">🎯 Версия</th>
                <th className="minecraft-th">🎤 Discord</th>
                <th className="minecraft-th">🎮 Minecraft</th>
                <th className="minecraft-th">📱 Telegram</th>
              </tr>
            </thead>
            <tbody className="minecraft-tbody">
              {sortedPlayers.map((player) => (
                <tr key={player.id} className="minecraft-tr">
                  <td className="minecraft-td">
                    <div className="text-sm">
                      {new Date(player.timestamp).toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="minecraft-td">
                    <Badge className="minecraft-age-badge">{player.age}</Badge>
                  </td>
                  <td className="minecraft-td font-semibold">{player.name}</td>
                  <td className="minecraft-td">
                    <div className="minecraft-activity">{player.activity}</div>
                  </td>
                  <td className="minecraft-td">
                    <Badge
                      className={`minecraft-frequency-badge ${getFrequencyBadge(player.playFrequency)}`}
                    >
                      {player.playFrequency}
                    </Badge>
                  </td>
                  <td className="minecraft-td">{player.timezone}</td>
                  <td className="minecraft-td">
                    <Badge
                      className={`minecraft-premium-badge ${
                        player.premium === "Да"
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "bg-slate-600 hover:bg-slate-700"
                      }`}
                    >
                      {player.premium}
                    </Badge>
                  </td>
                  <td className="minecraft-td">
                    <Badge
                      className={`minecraft-version-badge ${getVersionBadge(player.version)}`}
                    >
                      {player.version}
                    </Badge>
                  </td>
                  <td className="minecraft-td">
                    <Badge className="minecraft-discord-badge">
                      {player.discord}
                    </Badge>
                  </td>
                  <td className="minecraft-td">
                    <div className="minecraft-minecraft-nick">
                      {player.minecraft}
                    </div>
                  </td>
                  <td className="minecraft-td">
                    <div className="minecraft-telegram">{player.telegram}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayersTable;
