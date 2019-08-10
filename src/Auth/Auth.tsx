import React from 'react'
import SignUpDialog from './dialogs/SignUpDialog/SignUpDialog'
import SignInDialog from './dialogs/SignInDialog/SignInDialog'
import ResetPasswordDialog from './dialogs/ResetPasswordDialog/ResetPasswordDialog'
import WelcomeDialog from './dialogs/WelcomeDialog/WelcomeDialog'
import SettingsDialog from './dialogs/SettingsDialog/SettingsDialog'
import InputDialog from './dialogs/InputDialog/InputDialog'
import ConfirmationDialog from './dialogs/ConfirmationDialog/ConfirmationDialog'

import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import settings from './settings'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PersonIcon from '@material-ui/icons/Person'
import Button from '@material-ui/core/Button'
// validate.js
import validate from 'validate.js'
import constraints from './constraints.json'
import colors from './colors'

// Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/performance'
const auth = firebase.auth()

type Props = {
  isSignedIn: boolean
  user: any
  isPerformingAuthAction: boolean
  performAuthAction: Function
  // onSettingsClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  // onSignOutClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSignUpClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSignInClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export default function Auth(props: Props) {
  const primaryColor = settings.theme.primaryColor.name
  const secondaryColor = settings.theme.secondaryColor.name
  const type = settings.theme.type
  const { isSignedIn, isPerformingAuthAction, performAuthAction, user, onSignUpClick, onSignInClick } = props
  const [isWelcomeDialogOpen, setWelcomeDialogOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)
  const handleSettingsClick = () => {
    closeMenu()
    // props.onSettingsClick()
  }
  const handleSignOutClick = () => {
    closeMenu()
    // props.onSignOutClick()
  }
  const [isSignUpDialogOpen, setsignUpDialogOpen] = React.useState(false)
  const [isSignInDialogOpen, setsignInDialogOpen] = React.useState(false)
  const [isVerifyingEmailAddress, setisVerifyingEmailAddress] = React.useState(false)
  const [isSettingsDialogOpen, setsettingsDialogOpen] = React.useState(false)
  const [isSignoutDialogOpen, setsignoutDialogOpen] = React.useState(false)
  const [snackbarContentOpen, setSnackbarContent] = React.useState<null | string>(null)

  const signUp = (emailAddress: string, password: string, passwordConfirmation: string) => {
    if (isSignedIn) return
    if (!emailAddress || !password || !passwordConfirmation) return

    const errors = validate(
      {
        emailAddress: emailAddress,
        password: password,
        passwordConfirmation: passwordConfirmation,
      },
      {
        emailAddress: constraints.emailAddress,
        password: constraints.password,
        passwordConfirmation: constraints.passwordConfirmation,
      },
    )

    if (errors) {
      return
    }

    performAuthAction(
      auth
        .createUserWithEmailAndPassword(emailAddress, password)
        .then((value) => {
          setsignUpDialogOpen(false)
          setWelcomeDialogOpen(true)
        })
        .catch((reason) => {
          const code = reason.code
          const message = reason.message

          switch (code) {
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
            case 'auth/operation-not-allowed':
            case 'auth/weak-password':
              setSnackbarContent(message)
              return
            default:
              setSnackbarContent(message)
              return
          }
        }),
    )
  }
  const signIn = (emailAddress: string, password: string) => {
    if (isSignedIn) return
    if (!emailAddress || !password) return

    const errors = validate(
      {
        emailAddress: emailAddress,
        password: password,
      },
      {
        emailAddress: constraints.emailAddress,
        password: constraints.password,
      },
    )
    if (errors) return
    performAuthAction(
      auth
        .signInWithEmailAndPassword(emailAddress, password)
        .then((value: { user: any }) => {
          setsignInDialogOpen(false)
          const displayName = value.user.displayName
          const emailAddress = value.user.email
          setSnackbarContent(`Signed in as ${displayName || emailAddress}`)
        })
        .catch((reason) => {
          // const code = reason.code
          const message = reason.message
          setSnackbarContent(message)

          // switch (code) {
          //   case 'auth/invalid-email':
          //   case 'auth/user-disabled':
          //   case 'auth/user-not-found':
          //   case 'auth/wrong-password':
          //     this.openSnackbar(message)
          //     return

          //   default:
          //     this.openSnackbar(message)
          //     return
          // }
        }),
    )
  }
  const verifyEmailAddress = () => {
    if (!user || !user.email || !isSignedIn) return
    performAuthAction(
      user
        .sendEmailVerification()
        .then(() => {
          setisVerifyingEmailAddress(true)
          setSnackbarContent(`Verification e-mail sent to ${user.email}`)
        })
        .catch((reason: any) => {
          // const code = reason.code
          const message = reason.message
          setSnackbarContent(message)
          // switch (code) {
          //   case 'auth/missing-android-pkg-name':
          //   case 'auth/missing-continue-uri':
          //   case 'auth/missing-ios-bundle-id':
          //   case 'auth/invalid-continue-uri':
          //   case 'auth/unauthorized-continue-uri':
          //     this.openSnackbar(message)
          //     return

          //   default:
          //     this.openSnackbar(message)
          //     return
          // }
        }),
    )
  }

  return (
    <React.Fragment>
      {isSignedIn && (
        <React.Fragment>
          <IconButton color="inherit" disabled={isPerformingAuthAction} onClick={openMenu}>
            {/* {user.photoURL ? <Avatar alt="Avatar" src={user.photoURL} /> : <PersonIcon />} */}
            <PersonIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
            <MenuItem disabled={isPerformingAuthAction} onClick={handleSettingsClick}>
              Settings
            </MenuItem>
            <MenuItem disabled={isPerformingAuthAction} onClick={handleSignOutClick}>
              Sign out
            </MenuItem>
          </Menu>
          <Hidden only="xs">
            <WelcomeDialog
              open={isWelcomeDialogOpen}
              title={settings.title}
              user={user}
              isPerformingAuthAction={isPerformingAuthAction}
              onClose={() => setWelcomeDialogOpen(false)}
              onCancelClick={() => setWelcomeDialogOpen(false)}
              onVerifyClick={() => {
                verifyEmailAddress()
                setWelcomeDialogOpen(false)
              }}
            />

            <SettingsDialog
              open={isSettingsDialogOpen}
              user={user}
              isPerformingAuthAction={isPerformingAuthAction}
              isVerifyingEmailAddress={isVerifyingEmailAddress}
              colors={colors}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              type={type}
              defaultTheme={settings.theme}
              onClose={() => setsettingsDialogOpen(false)}
              // onAddAvatarClick={this.openAddAvatarDialog}
              // onChangeAvatarClick={this.openChangeAvatarDialog}
              onAddDisplayNameClick={this.openAddDisplayNameDialog}
              onChangeDisplayNameClick={this.openChangeDisplayNameDialog}
              onAddEmailAddressClick={this.openAddEmailAddressDialog}
              onVerifyEmailAddressClick={this.verifyEmailAddress}
              onPrimaryColorChange={this.changePrimaryColor}
              onSecondaryColorChange={this.changeSecondaryColor}
              onTypeChange={this.changeType}
              onResetClick={this.resetTheme}
            />

            {/* <InputDialog
              open={addAvatarDialog.open}
              title="Add avatar"
              contentText="Your avatar is used to represent you. It's visible to other users and can be changed any time."
              textField={
                <TextField
                  autoComplete="photo"
                  autoFocus
                  error={!!(addAvatarDialog.errors && addAvatarDialog.errors.avatar)}
                  fullWidth
                  helperText={
                    addAvatarDialog.errors && addAvatarDialog.errors.avatar ? addAvatarDialog.errors.avatar[0] : ''
                  }
                  margin="normal"
                  onChange={this.handleAvatarChange}
                  placeholder="Avatar URL"
                  required
                  type="url"
                  value={avatar}
                />
              }
              okText="Add"
              disableOkButton={!avatar || isPerformingAuthAction}
              highlightOkButton
              onClose={this.closeAddAvatarDialog}
              onExited={() => {
                this.setState({
                  avatar: '',
                })
              }}
              onCancelClick={this.closeAddAvatarDialog}
              onOkClick={this.addAvatar}
            /> */}

            {/* <InputDialog
              open={changeAvatarDialog.open}
              title="Change avatar"
              contentText="Your avatar is used to represent you. It's visible to other users and can be changed any time."
              textField={
                <TextField
                  autoComplete="photo"
                  autoFocus
                  error={!!(changeAvatarDialog.errors && changeAvatarDialog.errors.avatar)}
                  fullWidth
                  helperText={
                    changeAvatarDialog.errors && changeAvatarDialog.errors.avatar
                      ? changeAvatarDialog.errors.avatar[0]
                      : ''
                  }
                  margin="normal"
                  onChange={this.handleAvatarChange}
                  placeholder={user.photoURL}
                  required
                  type="url"
                  value={avatar}
                />
              }
              okText="Change"
              disableOkButton={!avatar || isPerformingAuthAction}
              highlightOkButton
              onClose={this.closeChangeAvatarDialog}
              onExited={() => {
                this.setState({
                  avatar: '',
                })
              }}
              onCancelClick={this.closeChangeAvatarDialog}
              onOkClick={this.changeAvatar}
            /> */}

            <InputDialog
              open={addDisplayNameDialog.open}
              title="Add display name"
              contentText="Your display name is used to represent you. It's visible to other users and can be changed any time."
              textField={
                <TextField
                  autoComplete="name"
                  autoFocus
                  error={!!(addDisplayNameDialog.errors && addDisplayNameDialog.errors.displayName)}
                  fullWidth
                  helperText={
                    addDisplayNameDialog.errors && addDisplayNameDialog.errors.displayName
                      ? addDisplayNameDialog.errors.displayName[0]
                      : ''
                  }
                  margin="normal"
                  onChange={this.handleDisplayNameChange}
                  placeholder="Display name"
                  required
                  type="text"
                  value={displayName}
                />
              }
              okText="Add"
              disableOkButton={!displayName || isPerformingAuthAction}
              highlightOkButton
              onClose={this.closeAddDisplayNameDialog}
              onExited={() => {
                this.setState({
                  displayName: '',
                })
              }}
              onCancelClick={this.closeAddDisplayNameDialog}
              onOkClick={this.addDisplayName}
            />

            <InputDialog
              open={changeDisplayNameDialog.open}
              title="Change display name"
              contentText="Your display name is used to represent you. It's visible to other users and can be changed any time."
              textField={
                <TextField
                  autoComplete="name"
                  autoFocus
                  error={!!(changeDisplayNameDialog.errors && changeDisplayNameDialog.errors.displayName)}
                  fullWidth
                  helperText={
                    changeDisplayNameDialog.errors && changeDisplayNameDialog.errors.displayName
                      ? changeDisplayNameDialog.errors.displayName[0]
                      : ''
                  }
                  margin="normal"
                  onChange={this.handleDisplayNameChange}
                  placeholder={user.displayName}
                  required
                  type="text"
                  value={displayName}
                />
              }
              okText="Change"
              disableOkButton={!displayName || isPerformingAuthAction}
              highlightOkButton
              onClose={this.closeChangeDisplayNameDialog}
              onExited={() => {
                this.setState({
                  displayName: '',
                })
              }}
              onCancelClick={this.closeChangeDisplayNameDialog}
              onOkClick={this.changeDisplayName}
            />

            <InputDialog
              open={addEmailAddressDialog.open}
              title="Add e-mail address"
              contentText="Your e-mail address is used to identify you. It's not visible to other users and can be changed any time."
              textField={
                <TextField
                  autoComplete="email"
                  autoFocus
                  error={!!(addEmailAddressDialog.errors && addEmailAddressDialog.errors.emailAddress)}
                  fullWidth
                  helperText={
                    addEmailAddressDialog.errors && addEmailAddressDialog.errors.emailAddress
                      ? addEmailAddressDialog.errors.emailAddress[0]
                      : ''
                  }
                  margin="normal"
                  onChange={this.handleEmailAddressChange}
                  placeholder="E-mail address"
                  required
                  type="email"
                  value={emailAddress}
                />
              }
              okText="Add"
              disableOkButton={!emailAddress || isPerformingAuthAction}
              highlightOkButton
              onClose={this.closeAddEmailAddressDialog}
              onExited={() => {
                this.setState({
                  emailAddress: '',
                })
              }}
              onCancelClick={this.closeAddEmailAddressDialog}
              onOkClick={this.addEmailAddress}
            />
          </Hidden>

          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <WelcomeDialog
              fullScreen
              open={welcomeDialog.open}
              title={settings.title}
              user={user}
              isPerformingAuthAction={isPerformingAuthAction}
              onClose={this.closeWelcomeDialog}
              onCancelClick={this.closeWelcomeDialog}
              onVerifyClick={() => {
                this.verifyEmailAddress(() => {
                  this.closeWelcomeDialog()
                })
              }}
            />

            <SettingsDialog
              fullScreen
              open={settingsDialog.open}
              user={user}
              isPerformingAuthAction={isPerformingAuthAction}
              isVerifyingEmailAddress={isVerifyingEmailAddress}
              colors={colors}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              type={type}
              defaultTheme={settings.theme}
              onClose={() => setsettingsDialogOpen(false)}
              onAddAvatarClick={this.openAddAvatarDialog}
              onChangeAvatarClick={this.openChangeAvatarDialog}
              onAddDisplayNameClick={this.openAddDisplayNameDialog}
              onChangeDisplayNameClick={this.openChangeDisplayNameDialog}
              onAddEmailAddressClick={this.openAddEmailAddressDialog}
              onVerifyEmailAddressClick={this.verifyEmailAddress}
              onPrimaryColorChange={this.changePrimaryColor}
              onSecondaryColorChange={this.changeSecondaryColor}
              onTypeChange={this.changeType}
              onResetClick={this.resetTheme}
            />

            <InputDialog
              fullScreen
              open={addAvatarDialog.open}
              title="Add avatar"
              contentText="Your avatar is used to represent you. It's visible to other users and can be changed any time."
              textField={
                <TextField
                  autoComplete="photo"
                  autoFocus
                  error={!!(addAvatarDialog.errors && addAvatarDialog.errors.avatar)}
                  fullWidth
                  helperText={
                    addAvatarDialog.errors && addAvatarDialog.errors.avatar ? addAvatarDialog.errors.avatar[0] : ''
                  }
                  margin="normal"
                  onChange={this.handleAvatarChange}
                  placeholder="Avatar URL"
                  required
                  type="url"
                  value={avatar}
                />
              }
              okText="Add"
              disableOkButton={!avatar || isPerformingAuthAction}
              highlightOkButton
              onClose={this.closeAddAvatarDialog}
              onExited={() => {
                this.setState({
                  avatar: '',
                })
              }}
              onCancelClick={this.closeAddAvatarDialog}
              onOkClick={this.addAvatar}
            />

            <InputDialog
              fullScreen
              open={changeAvatarDialog.open}
              title="Change avatar"
              contentText="Your avatar is used to represent you. It's visible to other users and can be changed any time."
              textField={
                <TextField
                  autoComplete="photo"
                  autoFocus
                  error={!!(changeAvatarDialog.errors && changeAvatarDialog.errors.avatar)}
                  fullWidth
                  helperText={
                    changeAvatarDialog.errors && changeAvatarDialog.errors.avatar
                      ? changeAvatarDialog.errors.avatar[0]
                      : ''
                  }
                  margin="normal"
                  onChange={this.handleAvatarChange}
                  placeholder={user.photoURL}
                  required
                  type="url"
                  value={avatar}
                />
              }
              okText="Change"
              disableOkButton={!avatar || isPerformingAuthAction}
              highlightOkButton
              onClose={this.closeChangeAvatarDialog}
              onExited={() => {
                this.setState({
                  avatar: '',
                })
              }}
              onCancelClick={this.closeChangeAvatarDialog}
              onOkClick={this.changeAvatar}
            />

            <InputDialog
              fullScreen
              open={addDisplayNameDialog.open}
              title="Add display name"
              contentText="Your display name is used to represent you. It's visible to other users and can be changed any time."
              textField={
                <TextField
                  autoComplete="name"
                  autoFocus
                  error={!!(addDisplayNameDialog.errors && addDisplayNameDialog.errors.displayName)}
                  fullWidth
                  helperText={
                    addDisplayNameDialog.errors && addDisplayNameDialog.errors.displayName
                      ? addDisplayNameDialog.errors.displayName[0]
                      : ''
                  }
                  margin="normal"
                  onChange={this.handleDisplayNameChange}
                  placeholder="Display name"
                  required
                  type="text"
                  value={displayName}
                />
              }
              okText="Add"
              disableOkButton={!displayName || isPerformingAuthAction}
              highlightOkButton
              onClose={this.closeAddDisplayNameDialog}
              onExited={() => {
                this.setState({
                  displayName: '',
                })
              }}
              onCancelClick={this.closeAddDisplayNameDialog}
              onOkClick={this.addDisplayName}
            />

            <InputDialog
              fullScreen
              open={changeDisplayNameDialog.open}
              title="Change display name"
              contentText="Your display name is used to represent you. It's visible to other users and can be changed any time."
              textField={
                <TextField
                  autoComplete="name"
                  autoFocus
                  error={!!(changeDisplayNameDialog.errors && changeDisplayNameDialog.errors.displayName)}
                  fullWidth
                  helperText={
                    changeDisplayNameDialog.errors && changeDisplayNameDialog.errors.displayName
                      ? changeDisplayNameDialog.errors.displayName[0]
                      : ''
                  }
                  margin="normal"
                  onChange={this.handleDisplayNameChange}
                  placeholder={user.displayName}
                  required
                  type="text"
                  value={displayName}
                />
              }
              okText="Change"
              disableOkButton={!displayName || isPerformingAuthAction}
              highlightOkButton
              onClose={this.closeChangeDisplayNameDialog}
              onExited={() => {
                this.setState({
                  displayName: '',
                })
              }}
              onCancelClick={this.closeChangeDisplayNameDialog}
              onOkClick={this.changeDisplayName}
            />

            <InputDialog
              fullScreen
              open={addEmailAddressDialog.open}
              title="Add e-mail address"
              contentText="Your e-mail address is used to identify you. It's not visible to other users and can be changed any time."
              textField={
                <TextField
                  autoComplete="email"
                  autoFocus
                  error={!!(addEmailAddressDialog.errors && addEmailAddressDialog.errors.emailAddress)}
                  fullWidth
                  helperText={
                    addEmailAddressDialog.errors && addEmailAddressDialog.errors.emailAddress
                      ? addEmailAddressDialog.errors.emailAddress[0]
                      : ''
                  }
                  margin="normal"
                  onChange={this.handleEmailAddressChange}
                  placeholder="E-mail address"
                  required
                  type="email"
                  value={emailAddress}
                />
              }
              okText="Add"
              disableOkButton={!emailAddress || isPerformingAuthAction}
              highlightOkButton
              onClose={this.closeAddEmailAddressDialog}
              onExited={() => {
                this.setState({
                  emailAddress: '',
                })
              }}
              onCancelClick={this.closeAddEmailAddressDialog}
              onOkClick={this.addEmailAddress}
            />
          </Hidden>

          <ConfirmationDialog
            open={signOutDialog.open}
            title="Sign out?"
            contentText="While signed out you are unable to manage your profile and conduct other activities that require you to be signed in."
            okText="Sign Out"
            disableOkButton={isPerformingAuthAction}
            highlightOkButton
            onClose={this.closeSignOutDialog}
            onCancelClick={this.closeSignOutDialog}
            onOkClick={this.signOut}
          />
        </React.Fragment>
      )}

      {!isSignedIn && (
        <React.Fragment>
          <Button
            // className={classes.signUpButton}
            color="secondary"
            disabled={isPerformingAuthAction}
            variant="contained"
            onClick={onSignUpClick}
          >
            Sign Up
          </Button>
          <Button color="secondary" disabled={isPerformingAuthAction} variant="contained" onClick={onSignInClick}>
            Sign In
          </Button>
          <Hidden only="xs">
            <SignUpDialog
              open={isSignUpDialogOpen}
              isPerformingAuthAction={isPerformingAuthAction}
              signUp={signUp}
              onClose={() => setsignUpDialogOpen(false)}
              onAuthProviderClick={this.signInWithProvider}
            />

            <SignInDialog
              open={signInDialog.open}
              isPerformingAuthAction={isPerformingAuthAction}
              signIn={signIn}
              onClose={this.closeSignInDialog}
              onAuthProviderClick={this.signInWithProvider}
              onResetPasswordClick={this.openResetPasswordDialog}
            />
          </Hidden>

          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <SignUpDialog
              fullScreen
              open={signUpDialog.open}
              isPerformingAuthAction={isPerformingAuthAction}
              signUp={this.signUp}
              onClose={() => setsignUpDialogOpen(false)}
              onAuthProviderClick={this.signInWithProvider}
            />

            <SignInDialog
              fullScreen
              open={signInDialog.open}
              isPerformingAuthAction={isPerformingAuthAction}
              signIn={this.signIn}
              onClose={this.closeSignInDialog}
              onAuthProviderClick={this.signInWithProvider}
              onResetPasswordClick={this.openResetPasswordDialog}
            />
          </Hidden>

          <ResetPasswordDialog
            open={resetPasswordDialog.open}
            isPerformingAuthAction={isPerformingAuthAction}
            resetPassword={this.resetPassword}
            onClose={this.closeResetPasswordDialog}
          />
        </React.Fragment>
      )}

      <Snackbar
        autoHideDuration={snackbar.autoHideDuration}
        message={snackbar.message}
        open={snackbar.open}
        onClose={this.closeSnackbar}
      />
    </React.Fragment>
  )
}
