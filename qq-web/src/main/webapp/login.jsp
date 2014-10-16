<%--
    Document   : login
    Created on : 10.10.2014, 8:23:02
    Author     : С. Благодатских
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Старница авторизации</title>
		<link rel="stylesheet" href="css/login.css"/>
		<script src="jquery-1.11.1.min.js" type="text/javascript"></script>
		<!--		<script src="jquery.ui.draggable.js" type="text/javascript"></script> -->
		<script src="jquery.alerts.js" type="text/javascript"></script>
		<link href="css/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />
		<style>
			/* Custom dialog styles */
			#popup_container.style_1 #popup_content {
				background: none;
			}

			#popup_container.style_1 #popup_message {
				padding-left: 0em;
			}

			#popup_container.style_1 {
				font-size: 0.9em;
				color: #230F07;
				background: #E5DCC5;
				border-color: #732607;
			}

			#popup_container.style_1 INPUT[type='button'] {
				border: outset 2px #424621;
				color: #230F07;
				background: #cf4c35;
			}
		</style>
		<script type="text/javascript">
			$.alerts.dialogClass = 'style_1';
		</script>
    </head>
    <body class="welcomecontainer">
		<%
			String username = request.getParameter("j_username");
			String password = request.getParameter("j_password");
			username = username == null ? "" : username;
			password = password == null ? "" : password;
			String path = request.getRequestURL().toString();
		%>
		<div id="zagolovok">АИС Запросы</div>
		<div id="subzagolovok">Справочно-информационный центр федеральных государственных архивов</div>
        <form method="POST" action="j_security_check" class="login_panel">
			<fieldset>
				<legend align="center">Вход в систему</legend>
				<div class="log_fields">
					<label>Логин:</label><input type="text" name="j_username"
												value='<%=username%>'/>
					<label>Пароль:</label><input type="password" name="j_password"
												 value='<%=password%>'/>
				</div>
			</fieldset>
			<div id="loginbutton"><input type="submit" value="Вход"/></div>
        </form>

		<%  if (!username.isEmpty()) { %>
		<script type="text/javascript">
			jAlert('Неправильный логин/пароль', 'ОК');
		</script>
		<%}%>

	</body>
</html>
