import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native'
import DeleteButton from './DeleteButton';
import CompleteButton from './CompleteButton';
import EditButton from './EditButton';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import { FormatTime } from '../ExtensionMethods';
import AreYouSure from './AreYouSure';
import EditTask from './EditTask';

const TodoTask = (props) => {


  const [expanded, setExpanded] = useState(true);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [EditState, setEditState] = useState(false)

  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const ButtonHandler = () => {     //expands and collapses the Task
    setExpanded((prevState) => {
      setExpanded(!prevState)
    })
  }

  const RightSwipe = () => {
    return <DeleteButton DeleteFunction={() => setDeleteWarning(true)} paddingVert={expanded ? 15 : 70}></DeleteButton>
  }

  const LeftSwipe = () => {
    return <EditButton EditFunction={() => setEditState(true)} paddingVert={expanded ? 15 : 70} />
  }

  return (
    <GestureHandlerRootView >
      <Swipeable renderRightActions={RightSwipe} renderLeftActions={LeftSwipe}>
        <Pressable style={[TaskStyles.TaskContainer, { backgroundColor: expanded ? 'black' : 'white' }]} onPress={ButtonHandler}>
          <View>
            <View style={TaskStyles.InitialView}>
              <View style={TaskStyles.DateView}>
                <Text style={[TaskStyles.Text, { color: expanded ? 'white' : 'black' }]}>{FormatTime(props.taskTime)}</Text>
                {!expanded ? <Text style={[TaskStyles.Text, { color: expanded ? 'white' : 'black' }]}>{weekday[props.taskTime.getDay()]}</Text> : null}
                {!expanded ? <Text style={[TaskStyles.Text, { color: expanded ? 'white' : 'black' }]}>{props.taskTime.getDay() + " " + months[props.taskTime.getDay()]}</Text> : null}
              </View>
              <Text style={[TaskStyles.Text, { color: expanded ? 'white' : 'black' }]}
                numberOfLines={expanded ? 1 : 10}
                ellipsizeMode='tail'>{props.taskText}</Text>
            </View>

            {!expanded ? <View style={TaskStyles.ExpandedView}>
              <CompleteButton CompleteFunction={props.CompleteFunction} />
            </View> : null}
          </View>

          <Modal visible={EditState} transparent={true}>
            <EditTask ShowEditTask={setEditState} SetButtonClicked={props.DeleteFunction}/>
          </Modal>
          
          <Modal visible={deleteWarning} transparent={true}>
            <AreYouSure ShowWarning={setDeleteWarning} YesButtonClicked={props.DeleteFunction}/>
          </Modal>

        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

const TaskStyles = StyleSheet.create({
  TaskContainer: {
    margin: 8,
    backgroundColor: 'black',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderRadius: 15,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 13,
  },

  InitialView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DateView: {
    display: 'flex',
    flexDirection: 'column'
  },
  ExpandedView: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 13,

  },
  Text: {
    fontSize: 15,
    maxWidth: 200,
  }
})

TodoTask.defaultProps = {
  taskTime: "10:00",
  taskText: "Default",
  otherText: "no"
}

export default TodoTask