# Generated by Django 3.0.3 on 2020-03-03 13:25

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0002_auto_20200229_2143'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'ordering': ['ordering', 'name'], 'verbose_name_plural': 'categories'},
        ),
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.TextField(max_length=500),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=50, unique=True, validators=[django.core.validators.MinLengthValidator(1)]),
        ),
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(max_length=2000, validators=[django.core.validators.MinLengthValidator(1)]),
        ),
        migrations.AlterField(
            model_name='thread',
            name='latest_post_time',
            field=models.DateTimeField(blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='thread',
            name='subject',
            field=models.TextField(max_length=2000, validators=[django.core.validators.MinLengthValidator(1)]),
        ),
        migrations.AlterField(
            model_name='thread',
            name='title',
            field=models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(1)]),
        ),
    ]
