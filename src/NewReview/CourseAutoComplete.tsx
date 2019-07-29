import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem'
import Downshift, { ControllerStateAndHelpers } from 'downshift'
import coursesData from './courses.json'

interface Suggestion {
  label: string
}

type Targs = [string, { name: string }]
const suggestions: Suggestion[] = Object.entries(coursesData).map(([key, value]: Targs) => {
  return {
    label: key + ': ' + value.name,
    value,
  }
})

type RenderInputProps = TextFieldProps & {
  classes: ReturnType<typeof useStyles2>
  ref?: React.Ref<HTMLDivElement>
}

function renderInput(inputProps: RenderInputProps) {
  const { InputProps, classes, ref, ...other } = inputProps

  // const {onBlur, onFocus} = InputProps
  // console.log({ InputProps })
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  )
}

interface RenderSuggestionProps {
  highlightedIndex: number | null
  index: number
  itemProps: MenuItemProps<'div', { button?: never }>
  selectedItem: Suggestion['label']
  suggestion: Suggestion
}

function renderSuggestion(suggestionProps: RenderSuggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}

function getSuggestions(value: string, { showEmpty = false } = {}) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter((suggestion) => {
        const keep = count < 5 && suggestion.label.toLowerCase().includes(inputValue.toLowerCase())

        if (keep) {
          count += 1
        }

        return keep
      })
}

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      // height: 250,
    },
    container: {
      // flexGrow: 1,
      // position: 'relative',
    },
    paper: {
      // position: 'absolute',
      // zIndex: 1,
      // marginTop: theme.spacing(1),
      // left: 0,
      // right: 0,
    },
    chip: {
      // margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
      flexWrap: 'wrap',
    },
    inputInput: {
      width: 'auto',
      flexGrow: 1,
    },
    divider: {
      // height: theme.spacing(2),
    },
  }),
)

type CACProps = {
  className?: string
  onChange: (selectedItem: any, stateAndHelpers: ControllerStateAndHelpers<any>) => void
}
export default function CourseAutoComplete(props: CACProps) {
  const classes = useStyles2()

  // <div className={classes.root}>
  return (
    <div className={props.className}>
      <Downshift onChange={props.onChange} id="downshift-simple">
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: 'Type course ID or title, case insensitive',
          })

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: 'Course',
                InputLabelProps: getLabelProps({ shrink: true } as any),
                InputProps: { onBlur, onFocus },
                inputProps,
              })}
              {/* TODO: convert to native select */}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue!).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem,
                      }),
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )
        }}
      </Downshift>
      {/* <div className={classes.divider} /> */}
    </div>
  )
}
