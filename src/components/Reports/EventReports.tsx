import { Paper, Text, Collapse, Stack, Container, Button, Group } from "@mantine/core";
import type { IEventWithReport } from "@/pages/Main/types";
import { useState } from "react";

interface EventReportsProps {
	event: IEventWithReport | null;
}

const EventReports: React.FC<EventReportsProps> = ({ event }) => {
	const [openedComments, setOpenedComments] = useState<{ [key: number]: boolean }>({});


	if (!event) {
		return (
			<Paper p="md">
				<Text>Пожалуйста, выберите мероприятие</Text>
			</Paper>
		);
	}

	const { reports, name, groups } = event;

	if (!reports || reports.length === 0) {
		return (
			<Paper p="md">
				<Text fw={700} mb="md">
					{name}
				</Text>
				<Text color="red">Нет отчетов для этого мероприятия 😕</Text>
			</Paper>
		);
	}

	const totalParticipants = reports.reduce(
		(total, report) => total + report.report.numParticipants,
		0
	);

	const groupsWithoutReport = groups.filter(
		(group) => !reports.some((report) => report.group.name === group)
	);

	const toggleComment = (groupId: number) => {
		setOpenedComments((prevState) => ({
			...prevState,
			[groupId]: !prevState[groupId],
		}));
	};

	const hasComments = reports.some((report) => report.report.comment);

	return (
		<Paper p="md">
			<Text fw={700} mb="md">
				{name}
			</Text>
			<Text>Всего участников: {totalParticipants}</Text>
			<Stack mt="md" gap="xs">
				{reports.map((report) => (
					<Text key={report.group.id}>
						{report.group.name}: {report.report.numParticipants || "Не отправлено"}
					</Text>
				))}
				{groupsWithoutReport.map((group) => (
					<Text key={group} >
						{group}:  <span style={{ color: "red" }}>Не отправлено</span>
					</Text>
				))}
			</Stack>
			<Stack mt="md" gap="xs">
			{hasComments && (
        <>
          <Text mt="0.5rem" fw={700}>
            Комментарии
          </Text>
          <Stack gap="xs">
            {reports
              .filter((report) => report.report.comment)
              .map((report) => (
                <>
                  <Group >
                    <Text>{report.group.name}:</Text>
                    <Button
                      variant="subtle"
                      color="gray"
                      onClick={() => toggleComment(report.group.id)}
                      w="fit-content"
                    >
                      {openedComments[report.group.id]
                        ? "Скрыть комментарий"
                        : "Показать комментарий"}
                    </Button>
                  </Group>
                  <Collapse
                    key={report.group.id}
                    in={openedComments[report.group.id] || false}
                  >
                    <Text>{report.report.comment}</Text>
                  </Collapse>
                </>
              ))}
          </Stack>
        </>
      )}
      {/* {!hasComments && <Text mt="md">Нет комментариев</Text>} */}
			</Stack>
		</Paper>
	);
};

export default EventReports;