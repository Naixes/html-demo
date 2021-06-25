{% extends 'home:page/layout.tpl' %}

{% block content %}
     <div id="pages-container">
        {% widget "common:widget/nav/nav.tpl"%}
        {% widget "home:widget/message/message.tpl"%}
     </div>
{% endblock %}