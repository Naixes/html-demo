{% extends 'yideng:page/layout.tpl' %}

{% block content %}
     <div id="pages-container">
        {% widget "common:widget/nav/nav.tpl"%}
        {% widget "yideng:widget/message/message.tpl"%}
     </div>
{% endblock %}