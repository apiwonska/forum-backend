# Generated by Django 3.0.3 on 2020-03-20 13:45

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20200310_1719'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='avatar',
            field=imagekit.models.fields.ProcessedImageField(blank=True, null=True, upload_to='users/'),
        ),
    ]
