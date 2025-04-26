import TaskStatusBar from "./TaskStatusBar";
import PersonAccordion from "./PersonAccordion";
import { useContext, useEffect, useState } from "react";
import { TeamsServices } from "@/services/teams/teams";
import { ProfileContext } from "@/contexts/ProfileContext";
import { emitter } from "@/events/statusEmitter";
import { Button, Container, Drawer, Group } from "@mantine/core";
import { SpotlightProvider, spotlight } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { IconDashboard, IconFileText, IconHome, IconSearch } from "@tabler/icons-react";
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useDisclosure } from "@mantine/hooks";

export default function TeamPage() {
    const [teams, setTeams] = useState([]);
    const { profile } = useContext(ProfileContext);
    const [selectedTeam, setSelectedTeam] = useState<any>(null);
    const [actions, setActions] = useState<SpotlightAction[]>([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [ganttTasks, setGanttTasks] = useState<Task[]>([]);

    useEffect(() => {
            TeamsServices.getTeams()
                .then((res) => {
                    const userTeams = res.data.teams.filter((team: any) =>
                        team?.owner === profile.name ||
                        team.members.some((member: any) => member.name === profile.name)
                    );
                    setTeams(userTeams);
                    setSelectedTeam(userTeams[0]);
                    setGanttTasks(userTeams[0]?.members?.reduce((acc: Task[], member: any) => {
                        return acc.concat(member.tasks.map((task: any) => {
                            return {
                                id: task.id,
                                name: task.summary,
                                start: new Date(task.start_date),
                                end: new Date(task.end_date),
                                progress: (task.original_estimate - task.estimation) / task.original_estimate * 100,
                                type: "task"
                            };
                        }
                        ));
                    }, []));

                    setActions(userTeams.map((team: any) => {
                        return {
                            title: team.name,
                            description: team.description,
                            onTrigger: () => {
                                setSelectedTeam(team);
                                setGanttTasks(team.members?.reduce((acc: Task[], member: any) => {
                                    return acc.concat(member.tasks.map((task: any) => {
                                        return {
                                            id: task.id,
                                            name: task.summary,
                                            start: new Date(task.start_date),
                                            end: new Date(task.end_date),
                                            progress: (task.original_estimate - task.estimation) / task.original_estimate * 100,
                                            type: "task"
                                        };
                                    }
                                    ));
                                }, []));
                            },
                            icon: <IconDashboard size="1.2rem" />,
                        };
                    }));
                })
                .catch((err) => {
                    console.log(err);
                });
    }, [profile]);

    useEffect(() => {
        const handleTaskCreated = (newTask: any) => {
            if (!newTask) {
                console.warn("taskCreated event received undefined newTask");
                // TeamsServices.getTeams()
                // .then((res) => {
                //     const userTeams = res.data.teams.filter((team: any) =>
                //         team?.owner === profile.name ||
                //         team.members.some((member: any) => member.name === profile.name)
                //     );
                //     setTeams(userTeams);
                //     setSelectedTeam(userTeams[0]);
                // })
                // .catch((err) => {
                //     console.log(err);
                // });
                return;
            }
            // Merge the newly-created task into the correct team/member
            setSelectedTeam((prevTeam: any) => {
                if (!prevTeam) return prevTeam;
                const updatedMembers = prevTeam.members.map((member: any) => {
                    if (member.id === newTask.assigned_to) {
                        return { ...member, tasks: [...member.tasks, newTask] };
                    }
                    return member;
                });
                return { ...prevTeam, members: updatedMembers };
            });
        };

        emitter.on("taskCreated", handleTaskCreated);
        return () => {
            emitter.off("taskCreated", handleTaskCreated);
        };
    }, []);

    function SpotlightControl() {
        return (
            <div
                className="fixed top-2 left-[300px] z-50 flex"
            >
                <Button onClick={() => spotlight.open()} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                    Change team
                </Button>
                <Button onClick={open} className="ml-4" variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>View Gantt chart</Button>
            </div>
        );
    }

    return (
        <div>
            <Drawer
                opened={opened}
                onClose={close}
                title=""
                overlayProps={{ opacity: 0.5, blur: 4 }}
                size="100%"
            >
                <h2 className="text-slate-700 mt-0">Project progress for {selectedTeam?.name}</h2>
                <Gantt
                    tasks={ganttTasks}
                    rowHeight={32}
                />
            </Drawer>
            <SpotlightProvider
                actions={actions}
                searchIcon={<IconSearch size="1.2rem" />}
                searchPlaceholder="Search..."
                shortcut="mod + shift + 1"
                nothingFoundMessage="Nothing found..."
            >
                <SpotlightControl />
            </SpotlightProvider>
            <TaskStatusBar team={selectedTeam} setTeam={setSelectedTeam} />
            <PersonAccordion team={selectedTeam} />
        </div>
    );
}
