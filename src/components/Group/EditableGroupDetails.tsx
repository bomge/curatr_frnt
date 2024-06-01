// EditableGroupDetails.tsx
import type React from 'react';
import { useState } from 'react';
import { Box, Button, Group, LoadingOverlay, Stack } from '@mantine/core';
import { EditableField } from '../Fields/EditableField';
import Links from '../Fields/Links';
import { showErrorNotification, showSuccessNotification } from '@/util/notification';
import type { FacultyInfo, Person } from '@/pages/Cafedra/Cafedras.page';
import type { ExtendedCafedra, ExtentedGroup, Student } from '@/pages/Group/Groups.page';
import { EditableSelectField, EditableTextField } from '../Fields/OtherFields';
import styles from './EditableGroupDetails.module.css'
interface EditableGroupDetailsProps {
	groupData: ExtentedGroup;
	selectedFacultyData: FacultyInfo | null;
	selectedCafedraData: ExtendedCafedra | null;
	faculties: FacultyInfo[];
	workers: Person[];
	isEditing: boolean;
	onSave: (updatedGroupData: ExtentedGroup) => void;
	onCancel: () => void;
}

const EditableGroupDetails: React.FC<EditableGroupDetailsProps> = ({
	groupData,
	workers,
	isEditing,
	onSave,
	onCancel,
  }) => {
	const [groupName, setGroupName] = useState(groupData.fullName);
	const [groupShortName, setGroupShortName] = useState(groupData.shortName);
	const [selectedCurator, setSelectedCurator] = useState<Person | null>(
		groupData.curator || null
	  );
	const [selectedGroupLeader, setSelectedGroupLeader] = useState<Student | null>(groupData.leader || null);
	const [isSaving, setIsSaving] = useState(false);

	const handleSave = async () => {
	  setIsSaving(true);
  
	  try {
		// Simulate sending data to the backend and waiting for a response
		const success = await new Promise<boolean>((resolve) =>
		  setTimeout(() => resolve(Math.random() > 0), 1000)
		);
  
		if (success) {
		  // Simulate receiving the updated group data from the backend
		  const updatedGroupData: ExtentedGroup = {
			...groupData,
			fullName: groupName,
			shortName: groupShortName,
			curator: selectedCurator,
			leader: selectedGroupLeader,
		  };
  
		  onSave(updatedGroupData);
		  showSuccessNotification('Group data saved successfully');
		} else {
		  showErrorNotification('Failed to save group data');
		}
	  } catch (error) {
		console.error('Error saving group data:', error);
		showErrorNotification('An error occurred while saving group data');
	  } finally {
		setIsSaving(false);
	  }
	};

  const handleCancel = () => {
    // Reset state or perform any other necessary actions
    onCancel();
  };
  return (
<>

<LoadingOverlay visible={isSaving} zIndex={1000} overlayProps={{
				radius: "sm",
				blur: 2
			}} />
      <EditableField
        label="Имя (полн.)"
        value={groupName}
        setValue={setGroupName}
        isEditing={isEditing}
        isMobile
		multiline
        component={EditableTextField}
		compProps={{
			w:'100%'
		}}
      />
      <EditableField
        label="Имя (кратк.)"
        value={groupShortName}
        setValue={setGroupShortName}
        isEditing={isEditing}
        isMobile
        component={EditableTextField}
		compProps={{
			w:'5rem'
		}}
      />

      <EditableField
        label="Куратор"
        value={selectedCurator?.id && String(selectedCurator?.id) || null}
        setValue={(value) =>
          setSelectedCurator(workers.find((w) => w.id == value) || null)
        }
        isEditing={isEditing}
        isMobile
        component={EditableSelectField}
        options={workers.map((w) => ({
          value: String(w.id),
          label: `${w.firstName} ${w.lastName}`,
        }))}
		compProps={{
			allowDeselect:true,
			// searchable:false
		}}
      />
      <EditableField
        label="Староста"
        value={selectedGroupLeader?.id && String(selectedGroupLeader?.id) || null }
        setValue={(value) =>
			{

				setSelectedGroupLeader(groupData.students.find((s) => s.id == value) || null)
			}
        }
        isEditing={isEditing}
        isMobile
        component={EditableSelectField}
        options={groupData.students.map((s) => ({
          value: String(s.id),
          label: `${s.firstName} ${s.lastName}`,
        }))}
		compProps={{
			allowDeselect:true,
			// searchable:false
		}}
      />
      {/* <EditableField
        label="Dean"
        value={selectedDean?.fullName}
        setValue={(value) =>
          setSelectedDean(workers.find((w) => `${w.firstName} ${w.lastName}` === value) || null)
        }
        isEditing={isEditing}
        isMobile={false}
        component={EditableSelectField}
        options={workers.map((w) => ({
          value: `${w.firstName} ${w.lastName}`,
          label: `${w.firstName} ${w.lastName}`,
        }))}
      />
      <EditableField
        label="Group Leader"
        value={selectedGroupLeader?.fullName}
        setValue={(value) =>
          setSelectedGroupLeader(students.find((s) => `${s.firstName} ${s.lastName}` === value) || null)
        }
        isEditing={isEditing}
        isMobile={false}
        component={EditableSelectField}
        options={students.map((s) => ({
          value: `${s.firstName} ${s.lastName}`,
          label: `${s.firstName} ${s.lastName}`,
        }))}
      /> */}
	  
      {isEditing && (
        <Group mt='1rem'>
			<Button onClick={handleSave} color='#00ff83a6' loading={isSaving}>
            Save
          </Button>
          <Button onClick={handleCancel} className={styles.cancelBtn}>
            Cancel
          </Button>
        </Group>
      )}
    </>								

  );
};

export default EditableGroupDetails;