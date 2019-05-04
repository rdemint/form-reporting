from django.core.management.base import BaseCommand, CommandError
from practices.models import DailySummary, Practice, Entity, Provider
from django.db.utils import IntegrityError
import csv
import os


class Command(BaseCommand):
	help = "create Entity objects from csv file data.  The file must have column header of Entity name in column A"

	def add_arguments(self, parser):
		parser.add_argument('data_file', type=str)

	def handle(self, *args, **options):
		file = options['data_file']
		total_created = 0
		total_skipped = 0
		skipped_lines = []
		integrity_error = False
		print('')

		with open(file, newline='',	encoding='utf-8-sig') as csvfile:
			reader = csv.reader(csvfile)

			for linenum, line in enumerate(reader):
				if linenum != 0:
					if line[0] != "":
						try:
							entity=Entity.objects.create(name=line[0].strip())
							total_created+=1
						except Exception as e:
							print(e)
		print('{} Entity objects were created'.format(total_created))